
var NIM = "2401010593"
var urlAPI = "https://apimhstiki.ptov.my.id/"
var urlTestiRead = urlAPI+"testi-"+NIM+"/read"
var urlTestiDel = urlAPI+"testi"

$("#infSukses").hide()
$("#infError").hide()

function hapus(id){
    $.ajax({
        url: urlTestiDel,
        method: 'POST',
        data: 'ACT=destroy&NIM='+NIM+'&IDX='+id,
        dataType: 'json',
        success:function(dt){
            $("#infSukses").show()
            $("#infSukses").html("Penghapusan Testimoni sukses")
            setTimeout(window.location.replace("index.html"),3000)
        },
        error:function(){
            $("#infError").show()
            $("#infError").html("Pengapusan Testimoni Gagal")
            setTimeout(window.location.replace("index.html"),3000)
        }
    })
}
$(function(){
    $.ajax({
        url: urlTestiRead,
        method: "GET",
        dataType: "json",
        success:function(dta){
            let tbl = ""
            let ipx = ""
            let cmdhapus = ""
            if(dta && ((dta.error==4) || (dta.error==0))){
                dta.TESTI.forEach(function(isi){
                    if(dta.error==0){
                        ipx = isi.IPX
                        cmdhapus = `<a onclick="hapus('${isi.IDX}')" class="btn btn-danger btn-sm"> Hapus </a>`
                    } 
                    tbl += 

              `<div class="item">
            <div class="box">
              <div class="img-box">
                <img src="${isi.GRAVATAR}" alt="" class="box-img">
              </div>
              <div class="detail-box">
                <div class="client_id">
                  <div class="client_info">
                    <h6>
                    ${isi.NAMA}
                    </h6>
                    <p>
                    ${isi.EMAIL}
                    </p>
                  </div>
                  <i class="fa fa-quote-left" aria-hidden="true"></i>
                </div>
                <p>
                  ${isi.TESTI}</p>
              </div>
            </div>
          </div>`
                })
            }
            $(".box").html(tbl) 
        },
        error:function(){
            console.log("Gagal Membaca data testimoni")
        }
    })
})
