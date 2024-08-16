const inch_to_mm = 25.39999983

function showDifference() {
    console.log("Diff");

    $(".page_difference").addClass("active");

    const $inputs_range = $(".page_difference .inputs input[type=range]");
    const $inputs_value = $(".inputs input[type=number]");

    const calculate = function() {
        let [size_1, offset_1, spacer_1, size_2, offset_2, spacer_2] =
            $inputs_value.map((i, node) => parseFloat($(node).val()));
        size_1 = size_1 * inch_to_mm;
        size_2 = size_2 * inch_to_mm;

        const A1 = -offset_1 + size_1/2;
        const A2 = -offset_2 + size_2/2;
        const rA1 = Math.round((-offset_1 + size_1/2) * 10) / 10;
        const rA2 = Math.round((-offset_2 + size_2/2) * 10) / 10;

        const D1 = A1 + offset_2 - size_2/2;
        const T1 = size_2 - size_1;
        const R1 = T1 - D1;
        const RR1 = T1 - R1;
        const rRR1 = Math.round((RR1 - spacer_2 + spacer_1) * 10) / 10;

        $(".deport_1_label").text(`Déport de la jante 1 par rapport au moyeux (en mm) :`);
        $(".deport_1").text(rA1.toFixed(1));
        $(".deport_2_label").text(`Déport de la jante 2 par rapport au moyeux (en mm) :`);
        $(".deport_2").text(A2.toFixed(1));

        if (rRR1 < 0) {
            $(".ext_label").text(`L'extérieur de la jante sera plus sortie de (en cm) :`);
            $(".ext").text((-rRR1/10).toFixed(1));
        } else {
            $(".ext_label").text(`L'extérieur de la jante sera plus rentrée de (en cm) :`);
            $(".ext").text((rRR1/10).toFixed(1));
        }
        const rR1 = Math.round((R1 + spacer_2 - spacer_1) * 10) / 10;
        if (rRR1 < 0) {
            $(".int_label").text(`L'interieur de la jante sera plus loin de l'amortisseur de (en cm) :`);
            $(".int").text((rR1/10).toFixed(1));
        } else {
            $(".int_label").text(`L'interieur de la jante sera plus proche de l'amortisseur de (en cm) :`);
            $(".int").text((-rR1/10).toFixed(1));
        }
    }
    const dragging_fct = function (e) {
        const $input = $(e.target);
        $input.prev().prev().val($input.val());
        calculate();
    }

    let dragging = false;
    $inputs_range.on("mouseup touchend", e => {
        dragging = false;
        dragging_fct(e);
    }).on("mousedown touchstart", e => {
        dragging = true;
    }).on("mousemove click touchmove", e => {
        if (dragging) {
            dragging_fct(e);
        }
    });

    $inputs_value.on("change keyup", e => {
        const $input = $(e.target);
        $input.next().next().val($input.val());
        if (e.keyCode === 13) {
            if ($input.next().next().attr("id") === "spacer_input_1") {
                $("#size_input_2").prev().prev().focus();
            } else if ($input.next().next().attr("id") === "spacer_input_2") {
                $("#size_input_1").prev().prev().focus();
            } else {
                $input.next().next().next().next().focus();
            }
        }
        calculate();
    })

    calculate();
}

function showAbsolute() {
    console.log("Abs");

    $(".page_absolute").addClass("active");
}

$(document).ready(_ => {
    const $menu_item = $(".menu_item");

    $menu_item.on("click", e => {
        $(".menu_item.active").removeClass("active");

        const $node = $(e.target);
        $node.addClass("active");
        $(".page").removeClass("active");
        if ($node.hasClass("difference")) {
            showDifference();
        } else if ($node.hasClass("absolute")) {
            showAbsolute();
        }
    })
    $(".difference").click();
});