
var tableclass = 'table-info';

var additem = function(items){
  var tr = $('<tr></tr>');
  tr.attr('value',items._id);
  // tr.attr('id',items._id);
  // var del = $("<button class='btn btn-outline-primary'>delete</button>");
  // del.attr('value',items._id).attr('id','delete');
  // del.click(deleteitem);
  tr.append($("<td></td>").text(items.id));
  tr.append($("<td></td>").text(items.name));
  tr.append($("<td></td>").text(items.author));
  tr.click(addTrClass);
  // tr.append(`<td>${items.id}</td><td>${items.name}</td><td>${items.author}</td>`);
  // tr.append($("<td></td>").append(del));
  $("#result").append(tr);
};


var addTrClass = function(){
  $(this).addClass(tableclass).siblings().removeClass(tableclass);
};


$(document).ready(function(){
    //GET方法
    $("#get").click(function(){
      var inputval = encodeURI($("#findname").val());
        $.ajax({
            url:'/api/find/'+inputval,
            type:'GET',
            timeout:5000,
            dataType:'json',
            success:function(data){
            $("#result").empty();
            for (var i = 0; i < data.length; i++) {
               additem(data[i]);
            }
            },
            error:function(){
                $("#result").html('0 result')
            }
        })
    })

    // $("#getAll").click(function(){
    //     $.ajax({
    //         url:'/api/find',
    //         type:'GET',
    //         timeout:5000,
    //         dataType:'json',
    //         success:function(data){
    //         $("#result").empty();
    //         for (var i = 0; i < data.length; i++) {
    //           additem(data[i]);
    //         }
    //         },
    //         error:function(){
    //             $("#result").html('0 result')
    //         }
    //     })
    // })
//POST方法
    $("#post").click(function(){
      var data = JSON.stringify({
                    id:$("#id").val(),
                    name:$("#name").val(),
                    author:$("#author").val()
                  });
        $.ajax({
            url:"/api/add/",
            type:'POST',
            timeout:5000,
            dataType:'json',
            contentType: "application/json",
            data:data,
            success:function(data,textStatus,jqXHR){
              $("#result").empty();
              additem(data);
              $("#id").val("");
              $("#name").val("");
              $("#author").val("");
            },
            error:function(xhr,textStatus){
                $("#result").html("Error")
            }
        })
    });

    $("#delete").click(function(){
      var delval = $("."+tableclass).attr("value");
        $.ajax({
            url:'/api/delete/'+ delval,
            type:'DELETE',
            timeout:5000,
            dataType:'json',
            success:function(data,textStatus,jqXHR){
                $("."+tableclass).remove();
            },
            error:function(xhr,textStatus){
                $("#result").html(textStatus)
            }
        })
    });

    $('#modalAdd').on('shown.bs.modal', function() {
        $('#id').focus();
    });

<<<<<<< HEAD
=======
    $('.prevent-form').on('submit',function(e){
      e.preventDefault();
    });

>>>>>>> 57c01c5... remake delete
});
