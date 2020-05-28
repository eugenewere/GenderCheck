document.querySelectorAll('input[data-max-words]').forEach(input => {
    let maxWords = parseInt(input.getAttribute('data-max-words') || 0);
    input.addEventListener('keydown', e => {
        let target = e.currentTarget;
        let words = target.value.split(/\s+/).length;
        if (!target.getAttribute('data-announce')) {
            words >= maxWords && e.keyCode == 32 && e.preventDefault();
        }
        else{
            words >= maxWords && e.keyCode == 32 && (e.preventDefault() || $('#exampleModal').modal('show'));
        }
    })
});
$('#exampleInputEmail1').keyup(function () {
    $('#exampleInputEmail1').removeClass('border-danger');
    $('#emailHelp').hide();
    $('#results-wrapper').slideUp();
});
$('#submit').click( function () {

    var input = $('#exampleInputEmail1');
    console.log(input.val().toLowerCase());
    if (input.val().length !== 0){
        $('#spin_id').show();
        var url = "https://genderapi.io/api/?name="+ input.val().toLowerCase() +"&key=5ecfb6a5756fae6b201d33e2";
        setTimeout(function(){
            $.ajax({
                url:url,
                type:"GET",
                success:getData,
                error:getError,
            })
        } ,4000);

    }
    else {
        $('#exampleInputEmail1').addClass('border-danger');
        $('#emailHelp').show();
    }
});
function getError(data) {
    $('#spin_id').hide();
    console.log(data);
}
function getData(data) {
    $('#spin_id').hide();
    $('#list_wrapper').html('');
    $('#list_wrapper').append(
        '<li data-toggle="tooltip" data-placement="top" title="Queried name" class="text-muted mb-3">Name: <span style="color:#2a2a2a;" id="1">'+ data['name'] +'</span></li>'+
        '<li data-toggle="tooltip" data-placement="top" title="Possible values: male, female" class="text-muted mb-3">Gender: <span style="color:#2a2a2a;" id="2">'+ data['gender'] +'</span></li>'+
        '<li data-toggle="tooltip" data-placement="top" title="Number of records that match your request on our server" class="text-muted mb-3">Number Of People With That Name: <span style="color:#2a2a2a;" id=3"">'+ data['total_names'] +'</span></li>'+
        '<li data-toggle="tooltip" data-placement="top" title="Determines the trueness of our service. 90 means that the result of gender query is 90% correct" class="text-muted mb-3">Probability: <span style="color:#2a2a2a;" id="4">'+ data['probability']+'</span></li>'+
        '<li data-toggle="tooltip" data-placement="top" title="Time taken to fetch data" class="text-muted mb-3">Time: <span style="color:#2a2a2a;" id="4">'+ data['duration']+'</span></li>'+
        '<li data-toggle="tooltip" data-placement="top" title="Number of credits used on this Search" class="text-muted mb-3">User Credits: <span style="color:#2a2a2a;" id="4">'+ data['used_credits']+'</span></li>'
    );
    if (data['gender'].toLowerCase() === 'male'){
        console.log('it is' + data['gender'] );
        document.querySelector('#img_item').setAttribute('src','static/male.png');
    }
    else if(data['gender'].toLowerCase() === 'female'){
        console.log('it is' + data['gender'] );
        document.querySelector('#img_item').setAttribute('src','static/female.png');
    }
    else {
        document.querySelector('#img_item').setAttribute('src','static/male.png');
    }
    $('#results-wrapper').slideDown();
}
$(function () {
    $('[data-toggle="tooltip"]').tooltip()
})