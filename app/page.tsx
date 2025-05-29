import TopPage from "@/components/TopPage";

const BASE_URL = "https://beta.vsrecorder.mobi/api/v1beta/environments";

interface Environment {
  id: string;
  title: string;
  from_date: Date;
  to_date: Date;
}

export default async function Home() {
  const date = new Date();
  const year = String(date.getFullYear());
  const month = ("0"+(date.getMonth() + 1)).slice(-2);
  const day =  ("0"+date.getDate()).slice(-2);

  try {
    const response = await fetch(`${BASE_URL}`+ "?date="+ year + "-" + month + "-" + day);
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    const data: Environment = await response.json();
    if (!data) {
      throw new Error("No environments found.");
    }

    return (
    <>
      <TopPage environmentId={data.id} environmentTitle={data.title}/>
    </>
    );
  } catch (error) {
    console.error("Failed to fetch environments:", error);

    return (
    <>
      <main className="max-h-screen bg-gradient-to-b from-background">
      <div className="container mx-auto px-4 pt-8 max-w-6xl">
        <div className="pb-5 text-center">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
              <a href={"/"} >
                ポケカ デッキタイプ診断
              </a>
          </h1>
        </div>

        <div className="text-center text-destructive mb-8 p-4 bg-destructive/10 rounded-lg max-w-lg mx-auto">
          {error instanceof Error ? error.message : String(error)}
        </div>
      </div>

      <footer className="pt-9 pb-5 text-center text-muted-foreground">
          <p>© {new Date().getFullYear()} provided by <a className={"underline"} href={"https://vsrecorder.mobi"}>バトレコ</a></p>
      </footer>
      </main>
    </>
    );
  };
};