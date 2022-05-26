import type {NextPage} from 'next'

const Home: NextPage = () => {
    return (
        <div className={"flex flex-col space-y-2 p-5"}>
            <details className={"select-none open:text-white open:bg-indigo-400"}>
                <summary className={"cursor-pointer"}>What is my fav. food.</summary>
                <span>김치</span>
            </details>
        </div>
    );
}

export default Home
