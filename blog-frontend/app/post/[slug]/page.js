import ClientPostDetail from './PostDetailClient';

async function getPost(slug) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts/${slug}`, {
        cache: 'no-store',
    });

    if (!res.ok) {
        console.error('❌ Không fetch được bài viết', res.status);
        throw new Error('Lỗi khi tải bài viết');
    }

    return res.json();
}

export default async function Page(props) {
    const { slug } = await props.params;
    const post = await getPost(slug);

    return <ClientPostDetail post={post} />;
}
