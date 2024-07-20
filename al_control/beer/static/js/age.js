document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('ageForm');

    form.addEventListener('submit', function (event) {
        event.preventDefault(); // フォームのデフォルトの送信を防ぐ
        const birthYear = document.getElementById('birthYear').value;
        const currentYear = new Date().getFullYear();
        const age = currentYear - birthYear;

        if (age >= 20) {
            // 20歳以上ならホームページにリダイレクト
            window.location.href = "/home/";
        } else {
            alert("このサイトは20歳以上の方を対象としています。");
        }
    });
});
