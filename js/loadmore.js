$(function () {
    $(".product-item").slice(0, 6).show();
    $("#load-more").on('click', function (e) {
        e.preventDefault();
        $(".product-item:hidden").slice(0, 6).slideDown();
        if ($(".product-item:hidden").length == 0) {
            $("#load").fadeOut('slow');
        }
    });
});