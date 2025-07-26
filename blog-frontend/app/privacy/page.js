'use client';

export default function PrivacyPage() {
    return (
        <main className="max-w-3xl mx-auto px-6 py-12">
            <h1 className="text-3xl font-bold mb-6">🔐 Chính sách bảo mật</h1>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">1. Dữ liệu chúng tôi thu thập</h2>
                <p>- Email, tên, ảnh đại diện từ tài khoản Google (khi bạn đăng nhập).</p>
                <p>- Thông tin bạn cung cấp qua bình luận và bài viết.</p>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">2. Cách chúng tôi sử dụng thông tin</h2>
                <p>- Để cá nhân hóa trải nghiệm người dùng.</p>
                <p>- Để liên hệ bạn khi cần phản hồi hoặc hỗ trợ.</p>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">3. Chia sẻ dữ liệu</h2>
                <p>Chúng tôi <strong>không bán hoặc chia sẻ</strong> dữ liệu người dùng với bên thứ ba, ngoại trừ khi được yêu cầu bởi pháp luật.</p>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">4. Cookie</h2>
                <p>Chúng tôi có thể sử dụng cookie để cải thiện trải nghiệm người dùng (ví dụ: ghi nhớ trạng thái đăng nhập).</p>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">5. Bảo mật</h2>
                <p>Dữ liệu được lưu trữ an toàn trên hệ thống máy chủ có bảo vệ, chỉ có quyền truy cập với các tài khoản được ủy quyền.</p>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">6. Quyền của bạn</h2>
                <p>Bạn có quyền yêu cầu xóa dữ liệu cá nhân bất cứ lúc nào bằng cách liên hệ với quản trị viên.</p>
            </section>
        </main>
    );
}
