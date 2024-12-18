import axios from 'axios';

export default function AuthorPage({ author }) {
    return (
        <div className="container mx-auto p-6">
            {/* Author Details */}
            <h1 className="text-4xl font-bold mb-4">Author Details</h1>

            <div className="border p-4 rounded-md shadow-md">
                <p className="text-xl mb-2">
                    <span className="font-semibold">Author ID:</span> {author._id}
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
    const { authorId } = context.params;
    let author;

    try {
        // Fetch author details from the API
        const response = await axios.get(`http://localhost:4000/api/reader/author/${authorId}`, {
            withCredentials: true,
        });
        author = response.data;
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
