import axios from 'axios';
import cookieParser from 'cookie-parser';


export default function Favorites({ favoriteBooks }) {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Your Favorite Books</h1>

            {favoriteBooks.length === 0 ? (
                <p>No favorite books yet. Go add some!</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {favoriteBooks.map((book) => (
                        <div
                            key={book._id}
                            className="border border-gray-300 rounded-lg p-4 shadow-md"
                        >
                            <h2 className="text-lg font-bold mb-2">{book.title}</h2>
                            <p className="text-gray-600 mb-2">{book.description}</p>
                            <p className="text-gray-500 mb-4">Genre: {book.genreId.name}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export async function getServerSideProps(context) {
    let favoriteBooks = [];
    const { req } = context;
    const cookies = cookieParser.JSONCookies(req.headers.cookie);
    if (!cookies)
        return {
            redirect: {
                destination: '/auth',
            }
        }

    try {
        // Assuming the backend provides an endpoint to get favorite books
        const response = await axios.get('http://localhost:4000/api/reader/', {
            headers: {
                Cookie: cookies,
            },
            withCredentials: true,
        });
        console.log(response.data.reader.favoriteBooks)
        favoriteBooks = response.data.reader.favoriteBooks || [];
    } catch (error) {
        console.error('Error fetching favorite books:', error);
    }

    return {
        props: {
            favoriteBooks,
        },
    };
}
