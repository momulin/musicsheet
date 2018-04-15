
var tableclass = 'table-info';
var selectId,selectName,selectAuthor;


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
  selectId = $("."+tableclass+" td:nth-child(1)").text();
  selectName = $("."+tableclass+" td:nth-child(2)").text();
  selectAuthor = $("."+tableclass+" td:nth-child(3)").text();
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
                    id:$("#Add_id").val(),
                    name:$("#Add_name").val(),
                    author:$("#Add_author").val()
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
              $("#Add_id").val("");
              $("#Add_name").val("");
              $("#Add_author").val("");
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

    $("#patch").click(function(){
      var patchval = $("."+tableclass).attr("value");
      var data = JSON.stringify({
                    id:$("#Patch_id").val(),
                    name:$("#Patch_name").val(),
                    author:$("#Patch_author").val()
                  });
        $.ajax({
            url:"/api/patch/"+patchval,
            type:'PATCH',
            timeout:5000,
            dataType:'json',
            contentType: "application/json",
            data:data,
            success:function(data,textStatus,jqXHR){
              $("."+tableclass+" td:nth-child(1)").text(data.id);
              $("."+tableclass+" td:nth-child(2)").text(data.name);
              $("."+tableclass+" td:nth-child(3)").text(data.author);
              selectId = data.id;
              selectName = data.name;
              selectAuthor = data.author;
            },
            error:function(xhr,textStatus){
                $("#result").html("Error")
            }
        })
    });


    $('#modalAdd').on('shown.bs.modal', function() {
        $('#Add_id').focus();
    });

    $('#modalPatch').on('shown.bs.modal', function() {
        $('#Patch_id').val(selectId);
        $('#Patch_name').val(selectName);
        $('#Patch_author').val(selectAuthor);
    });

<<<<<<< HEAD
=======
    $('.prevent-form').on('submit',function(e){
      e.preventDefault();
    });

>>>>>>> 57c01c5... remake delete
});
