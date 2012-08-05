function load_slides() {
    var filelist = [
        "The strong interaction",
    "The weak interaction",
    "What is the world made of",
    "The electromagnetic interaction",
    "Three Generations",
    "Antimatter",
    "The Higgs"
        ];

    //$(filelist).each(function(){alert($(this).html());});
    var last = false;

    for (var i = 0; i < filelist.length; i++ ) {

        if (i == filelist.length - 1 ) {
            last = true;
        }

        var filename = to_filename(filelist[i]);
        // get 
        var chapter = get_html(filename, "chapter", "html", last);
        var readmore = get_html(filelist[i], "readmore", "html");
        // here we just need the URL
        //var icon = get_html(filelist[i], "img", "png");
        //
        //alert (chapter);

    }

}

function to_filename(title) {
    return title.toLowerCase().replace(/ /g, '_'); 
}

function get_html(file, prefix, extension, last ){

    $.ajax( {
        url :"./" + prefix + "/" + file  + "." + extension,
    dataType: "html" 
    }
    ).done( function(data) {
        //alert('<li class="slide"><div>' + data + "</div></li>");
        if (prefix == "chapter") {
            $("#slider").append('<li class="slide"><div class="span12">' + data + "</div></li>");
        }
        //$("ul.nav-pills").append('<li><a href="#">' + $(data).find('h1').text() + '</a></li>');
        if (last) {
            set_sliders();
            fill_menu();
        }
        //return data;
    });

}


function fill_menu() {
    $($(".slide").get()).each(function() {
        $("ul.nav-pills").append('<li><img style="width:3em;height:3em;"><a href="#">' + $(this).find('h1').html() + '</a></li>');
    });
}
