var total_subject = 8;
        var totalSubject_OnePage = 4;
        var pageIndex = 1;
        var numOfPage;
        var startPage = 1;
        var endPage = totalSubject_OnePage;

        $(document).ready(function(){
            $.getJSON('https://sinhvien.phongdaotao.com/getcourses.php', function(data){  
                const courses = data.data;
                let id_desc = 1;
                for (let i = 0; i < courses.length; i++) {
                    $('#Courses').append('<tr id="' + courses[i].id + '" class="subject"><td>' + courses[i].id + '</td><td>' + courses[i].name + '</td></tr>');
                    getDetail(id_desc);
                    id_desc += 1;
                }
            }).done(function(){
                total_subject = $('.subject').length;
                pagination();
            });
        });
            
        numOfPage = total_subject/totalSubject_OnePage;
        function getDetail(id){
            $.get('https://sinhvien.phongdaotao.com/course.php?id=' + id, (desc) =>{
                var des = $('<tr class="desc__subject" id="infor__' + id + '"><td  colspan="2"><p>' + desc.description + '</p><p>' + desc.textbook + '</p></td>');
                des.insertAfter($('#' + id));
            });
        }


        
        function clickToShow(){
            $('#Courses').on('click', 'td', function(){
                let id__infor = $(this).parent().find('td:first').text();
                $('#infor__' + id__infor).slideToggle(100);
            })
        }

        function pagination(){
            $('.subject').hide();
            for(i = startPage; i <= endPage; i++){
                $('#' + i).show();
            }
            $('#page-count').empty();
            $('#page-count').append('Showing ' + startPage + ' to ' + endPage + ' of ' + (total_subject -1));
        }

        
        function createNav() {
            numOfPage = total_subject/totalSubject_OnePage;
            $(".pagination").append("<button class='btn' id='prev'>&#8592</button>");
            for (i = 1; i <= numOfPage; i++){
                if (i == 1) {
                    $(".pagination").append("<button class='page active' id='page__" + i +"'>" + i + "</button>");
                }else {
                    $(".pagination").append("<button class='page' id='page__" + i +"'>" + i + "</button>");
                }
            }
            $(".pagination").append("<button class='btn' id='next'>&#8594</button>");
            $('#page-count').empty();
            $('#page-count').append('Showing ' + startPage + ' to ' + endPage + ' of ' +(total_subject -1));
        }

        function clickPage(){
            $('.page').on('click', function(){
                $('.active').removeClass('active');
                $(this).addClass('active');
                pageIndex = parseInt($(this).attr('id').slice(6));
                startPage = ((pageIndex-1)*totalSubject_OnePage) +1;
                endPage = pageIndex * totalSubject_OnePage;
                pagination();
            })
            $('#page-count').empty();
            $('#page-count').append('Showing ' + startPage + ' to ' + endPage + ' of ' +(total_subject -1));
        }

        function clickNext(){
            numOfPage = total_subject/totalSubject_OnePage;
            $('#next').on('click', function(){
                if(pageIndex >= numOfPage){
                    $('.active').removeClass('active');
                    $('#page__' + pageIndex).addClass('active');
                }else{
                    $('.active').removeClass('active');
                    pageIndex++;
                    $('#page__' + pageIndex).addClass('active');
                    startPage += (totalSubject_OnePage);
                    endPage += (totalSubject_OnePage);
                    pagination();
                    
                }
            })
            $('#page-count').empty();
            $('#page-count').append('Showing ' + startPage + ' to ' + endPage + ' of ' +(total_subject -1));
        }

        function clickPrev(){
            $('#prev').on('click', function(){
                if(pageIndex <= 1){
                    $('.active').removeClass('active');
                    $('#page__' + pageIndex).addClass('active');
                }else{    
                    $('.active').removeClass('active');
                    pageIndex--;
                    $('#page__' + pageIndex).addClass('active');
                    startPage -= (totalSubject_OnePage );
                    endPage -= (totalSubject_OnePage );
                    pagination();
                }
            })
            $('#page-count').empty();
            $('#page-count').append('Showing ' + startPage + ' to ' + endPage + ' of ' +(total_subject -1));
        }
     
        clickToShow();   
        createNav(); 
        pagination()
        clickPage();
        clickNext();
        clickPrev(); 