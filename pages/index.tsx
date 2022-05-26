import type {NextPage} from 'next'

const Home: NextPage = () => {
    return (
        <div className={"flex flex-col space-y-2 p-5"}>
            <p className={"first-letter:text-7xl first-letter:hover:text-purple-500"}>Lorem ipsum dolor sit amet,
                consectetur adipisicing elit. Commodi
                delectus dignissimos enim est facere facilis ipsam quis tempore veniam! Culpa distinctio enim eveniet
                exercitationem incidunt inventore laborum officia quod tempore?</p>
        </div>
    );
}

export default Home
