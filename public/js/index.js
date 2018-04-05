


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
             var items = data[i];
             var li = $('<li></li>');
             li.attr('id',items.id);
             var del = $("<button>delete</button>");
             del.attr('value',items.id).attr('id','delete');
             del.click(deletefunc);
             li.text(`編碼:${items.id} 曲名:${items.name} 作者:${items.author}`);
             li.append(del);
             $("#result").append(li);
            }
            },
            error:function(){
                $("#result").html('0 result')
            }
        })
    })

    $("#getAll").click(function(){
        $.ajax({
            url:'/api/find',
            type:'GET',
            timeout:5000,
            dataType:'json',
            success:function(data){
            $("#result").empty();
            for (var i = 0; i < data.length; i++) {
             var items = data[i];
             var tr = $('<tr></tr>');
             tr.attr('id',items.id);
             var del = $("<button class='btn btn-outline-primary'>delete</button>");
             del.attr('value',items.id).attr('id','delete');
             del.click(deletefunc);
             tr.append(`<td>${items.id}</td><td>${items.name}</td><td>${items.author}</td>`);
             tr.append(del);
             $("#result").append(tr);
            }
            },
            error:function(){
                $("#result").html('0 result')
            }
        })
    })
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
                $("#result").html("Add "+data.name)
            },
            error:function(xhr,textStatus){
                $("#result").html("ID already exist")
            }
        })
    })
//PUT方法
    $("#put").click(function(){
        $.ajax({
            url:'http://localhost:8080/product/1/?name=测试PUT&age=22',
            type:'PUT',
            timeout:5000,
            dataType:'text',
            success:function(data,textStatus,jqXHR){
                $("#result").html(data)
            },
            error:function(xhr,textStatus){
                $("#result").html(textStatus)
            }
        })
    })
// //DELETE方法
//     $("#delete").click(function(){
//         $.ajax({
//             url:'http://localhost:3000/api/delete/'+ $(this).val(),
//             type:'DELETE',
//             timeout:5000,
//             dataType:'text',
//             success:function(data,textStatus,jqXHR){
//                 $(this).parent().remove();
//             },
//             error:function(xhr,textStatus){
//                 $("#result").html(textStatus)
//             }
//         })
// })
});


var deletefunc = function(){
  console.log("del");
    $.ajax({
        url:'/api/delete/'+ $(this).val(),
        type:'DELETE',
        timeout:5000,
        dataType:'json',
        success:function(data,textStatus,jqXHR){
          console.log(data.id);
            $("#"+data.id).remove();
            console.log($("li#delete"));
        },
        error:function(xhr,textStatus){
            $("#result").html(textStatus)
        }
    })
};
