function sendMail() {
    alert("We're in");
    $.ajax({
    url: 'sendEmail.php',
    type: 'GET',
    data: {textdata: final_transcript},
    success: function(data) {
                    alert("Jatin so Sad");
    }
    });
}