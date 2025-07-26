'use client';

export default function TermsPage() {
    return (
        <main className="max-w-3xl mx-auto px-6 py-12">
            <h1 className="text-3xl font-bold mb-6">📜 Điều khoản sử dụng</h1>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">1. Chấp nhận điều khoản</h2>
                <p>Khi sử dụng Blog Chill, bạn đồng ý tuân thủ các điều khoản được quy định tại đây.</p>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">2. Tài khoản</h2>
                <p>Bạn cần đăng nhập để đăng bài hoặc bình luận. Mọi hành vi sai phạm sẽ bị xử lý và có thể bị khóa tài khoản.</p>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">3. Nội dung</h2>
                <p>Bạn chịu trách nhiệm cho nội dung bạn đăng. Không đăng tải nội dung vi phạm pháp luật hoặc thuần phong mỹ tục.</p>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">4. Quyền hạn</h2>
                <p>Quản trị viên có quyền chỉnh sửa hoặc xoá nội dung vi phạm mà không cần thông báo trước.</p>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">5. Sử dụng hợp lý</h2>
                <p>Không được tấn công hệ thống, spam, hay sử dụng bot nhằm phá hoại nền tảng.</p>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">6. Liên hệ</h2>
                <p>Nếu bạn có câu hỏi hay khiếu nại, hãy liên hệ quản trị viên để được hỗ trợ.</p>
            </section>
        </main>
    );
}
