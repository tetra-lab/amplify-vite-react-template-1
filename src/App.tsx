import { useState, useEffect } from 'react';
// Gen2のREST API機能をインポート
import { get } from 'aws-amplify/api';
import './App.css'; // スタイルシートをインポート

// 物件データの型を定義
interface Property {
  id: string;
  所在地?: string;
  価格?: string;
  想定利回り?: string;
  score?: number;
  URL?: string;
  [key: string]: any; // その他のキーも許容
}

function App() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchProperties() {
      try {
        console.log('API呼び出しを開始します...');
        // バックエンドで定義したAPIのエンドポイントを呼び出す
        const restOperation = get({
          // amplify/data/resource.ts で定義したAPIの管理名
          apiName: 'FudosanApiEndpoint',
          path: '/properties'
        });

        const { body } = await restOperation.response;
        const data = await body.json();

        console.log('APIからデータを取得しました:', data);
        setProperties(data as Property[]);
      } catch (err) {
        console.error('物件データの取得中にエラーが発生しました', err);
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }
    fetchProperties();
  }, []);

  if (loading) {
    return <div className="App-container"><h1>読み込み中...</h1></div>;
  }

  if (error) {
    return <div className="App-container"><h1>エラーが発生しました</h1><p>{error.message}</p></div>;
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>おすすめ物件一覧</h1>
      </header>
      <main className="App-container">
        <div className="property-list">
          {properties.map(prop => (
            <div key={prop.id} className="property-card">
              <h2>{prop['所在地']?.split('\n')[0] || '名称未設定'}</h2>
              <p><strong>価格:</strong> {prop['価格']}</p>
              <p><strong>想定利回り:</strong> {prop['想定利回り']}</p>
              <p><strong>スコア:</strong> {prop.score}</p>
              <a href={prop.URL} target="_blank" rel="noopener noreferrer" className="property-link">
                詳細を見る
              </a>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
