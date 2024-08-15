inch_to_mm = 25.39999983

function showDifference() {
    console.log("Diff");
    const $inputs = $(".inputs input");

    const dragging_fct = function (e) {
        const $input = $(e.target);
        console.log($input.attr("id"));
    }

    let dragging = false;
    $inputs.on("mouseup touchend", e => {
        dragging = false;
        dragging_fct(e);
    }).on("mousedown touchstart", e => {
        dragging = true;
    }).on("mousemove click touchmove", e => {
        if (dragging) {
            dragging_fct(e);
        }
    });
}

function showAbsolute() {
    console.log("Abs");

}

$(document).ready(_ => {
    const $menu_item = $(".menu_item");

    $menu_item.on("click", e => {
        $(".menu_item.active").removeClass("active");

        const $node = $(e.target);
        $node.addClass("active");
        if ($node.hasClass("difference")) {
            showDifference();
        } else if ($node.hasClass("absolute")) {
            showAbsolute();
        }
    })
    $(".difference").click();
});