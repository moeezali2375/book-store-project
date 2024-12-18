import axios from 'axios';
import cookieParser from 'cookie-parser';


export default function AuthorPage({ author }) {
    return (
        <div className="container mx-auto p-6">
            {/* Author Details */}
            <h1 className="text-4xl font-bold mb-4">Author Details</h1>

            <div className="border p-4 rounded-md shadow-md">
                <p className="text-xl mb-2">
                    <span className="font-semibold">Author Name:</span> {author.userId.name}
                </p>
                <p className="text-lg mb-2">
                    <span className="font-semibold">Biography:</span> {author.biography || 'No biography available'}
                </p>
            </div>
        </div>
    );
}

// Server-Side Rendering (SSR) to fetch author details
export async function getServerSideProps(context) {
    const { id } = context.params;
    let author;
    const { req } = context;
    const cookies = cookieParser.JSONCookies(req.headers.cookie);
    if (!cookies)
        return {
            redirect: {
                destination: '/auth',
            }
        }

    try {
        // Fetch author details from the API
        const response = await axios.get(`http://localhost:4000/api/reader/writer/${id}`, {
            headers: {
                Cookie: cookies,
            },
            withCredentials: true,
        });
        console.log(response.data)
        author = response.data.writer;
    } catch (error) {
        console.error('Error fetching author details:', error);

        // Fallback dummy author details if API fails
        author = {
            _id: '6757622e267f155a200fc0c4',
            biography: 'This is a fallback biography for the author.',
        };
    }

    return {
        props: {
            author,
        },
    };
}
