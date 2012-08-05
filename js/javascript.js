function load_slides() {
    var filelist = [
        "What is the world made of",
        "Strong interactions" /*,
        "The Electromagnetic Interaction",
        "Nuclear decay and the weak interaction",
        "The Three Generations of Matter",
        "The Higgs",
        "Antimatter"*/
        ];

    //$(filelist).each(function(){alert($(this).html());});
    for (var i = 0; i < filelist.length; i++ ) {
        var filename = to_filename(filelist[i]);
        // get 
        var chapter = get_html(filename, "chapter", "html");
        //var readmore = get_html(filelist[i], "readmore", "html");
        // here we just need the URL
        //var icon = get_html(filelist[i], "img", "png");
        //
        //alert ($.html(chapter));


    }

}

function to_filename(title) {
    return title.toLowerCase().replace(/ /g, '_'); 
}

function get_html(file, prefix, extension ){

        $.ajax( "./" + prefix + "/" + file  + "." + extension ).done( function(data) {
            alert(data);
        });

}
