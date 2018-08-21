/*
**
** main.js
**
*/

//画棋盘
var canvas=document.getElementById("canvas");
if(canvas.getContext)
{
    //画棋盘外框
    var context = canvas.getContext('2d');
    context.strokeStyle="black";
    context.lineWidth="2";
    context.strokeRect(60*0.85,60*0.85,560*0.85,560*0.85);

    //画横竖线
    for(var i=0;i<7;i++)
    {
        context.beginPath();
        context.strokeStyle="black";
        context.moveTo(60*0.85,(130+70*i)*0.85);
        context.lineTo(620*0.85,130*0.85+70*0.85*i);
        context.moveTo(130*0.85+70*0.85*i,60*0.85);
        context.lineTo(130*0.85+70*0.85*i,620*0.85);
        context.stroke();
        //context.closePath();
    }
}

/*var imgURL= canvas.toDataURL("png");
var image = document.createElement("img");
image.src = imgURL;
document.body.appendChild(image);
*/

//全局变量
var me=1;//执黑先行
var load_number=0;//提示步数数
var start=0;
var huiHe_change=0;
var huiHe_number=1;
var a=new Array(9);
for(let i=0;i<a.length;i++)
{
    a[i]=new Array(9);
}
for(let i=0;i<9;i++)
{
    for(let j=0;j<9;j++)
    {
        a[i][j]=2;
    }
}
var aa=new Array();
aa=a;

var b=new Array(64);
for(let i=0;i<b.length;i++)
{
    b[i]=new Array(2);
}

//隐藏菜单
$("#menu").hide();

//画子
function drawpiece(x,y,who)
{
    if(x<=0||y<=0)
    {
        return;
    }
    context.beginPath();
    context.arc(x*70*0.85+25*0.85,y*70*0.85+25*0.85,30*0.85,0,Math.PI*2,true);
    context.closePath();
    let grad=context.createRadialGradient(x*70*0.85+25*0.85,y*70*0.85+25*0.85,30*0.85,x*70*0.85+25*0.85,y*70*0.85+25*0.85,0);//渐变
    if(who==1)
    {
        context.beginPath();
        context.arc(x*70*0.85+25*0.85,y*70*0.85+25*0.85,27*0.85,0,Math.PI*2,true);
        context.closePath();
        context.strokeStyle="#819eb1";
        context.lineWidth=2;
        context.stroke();
        return;
    }
    if(me)
    {
        grad.addColorStop(0, '#0A0A0A');
		grad.addColorStop(1, '#636766');
    }
    else
    {
        grad.addColorStop(0, '#D4D4D4');
		grad.addColorStop(1, 'white');
    }
    context.fillStyle=grad;
    context.fill();
}

//清除提示
function removeTip()
{
    for(let p=2;p<load_number*2+2;p+=2)
    {
        context.clearRect(51+(b[p][1]-1)*70*0.85+4.25,51+(b[p][0]-1)*70*0.85+4.25,51,51);
    }
}

//落子
/*$("#canvas").click
(
    function downpiece(e)
    {
       
        //let e = event || window.event;
        let x=e.offsetX;
        let y=e.offsetY;
        if(x<=60||x>=620||y<=60||y>=620)
        {
            ////alert("hello");
            return;
        }
        let i=Math.floor((x-60)/70+1);
        let j=Math.floor((y-60)/70+1);
        drawpiece(i,j);
        me=!me;
    }
)*/

//随机落子
function suijidown()
{
    b
}

//画最初的四个子
function initpiece()
{
    //////alert("ddddd");
    a[4][4]=0;
    a[5][5]=0;
    a[4][5]=1;
    a[5][4]=1;
    aa[4][4]=0;
    aa[5][5]=0;
    aa[4][5]=1;
    aa[5][4]=1;
    me=0;
    drawpiece(4,4,0);
    drawpiece(5,5,0);
    me=1;
    drawpiece(4,5,0);
    drawpiece(5,4,0);
    //////alert("ddddd");
}
initpiece();

//更新棋盘棋子
function freshpiece()
{
    for(let i=1;i<9;i++)
    {
        for(let j=1;i<9;j++)
        {
            if(aa[i][j]==me)
            {
                drawpiece(i,j,0);
            }
        }
    }
}

//落子
//function downPiece()

    searchAllLoad();
    huiHe_change++;
    tip();
    function action_1()
    {
        if(me==1)
        {
            $("#score1").css({"font-size":"4em","color": "coral"})
            $("#score2").css({"font-size":"3em","color": "#00ffff"})
        }
        else
        {
            $("#score1").css({"font-size":"3em","color": "#00ffff"})
            $("#score2").css({"font-size":"4em","color": "coral"})
        }
    }
    action_1();
    
    canvas.onclick=(e)=>
    {
        ////alert("666");
        let x=e.offsetX;
        let y=e.offsetY;
        if(x<=60*0.85||x>=620*0.85||y<=60*0.85||y>=620*0.85)
        {
            return;
        }
        ////alert("777")
        let i=Math.floor((x-60*0.85)/(70*0.85)+1);
        let j=Math.floor((y-60*0.85)/(70*0.85)+1);
        //if(load_number==0)
       // {
        //    return;
        //}
        /*for(let h=0;h<64;h++)
        {
            change=b[h][0];
            b[h][0]=b[h][1];
            b[h][1]=change;
        }*/
        var ischange=0;
        var changeij=i;
        i=j;
        j=changeij;
        for(let i1=2;i1<load_number*2+2;i1+=2)
        {
            ////alert(b);
            if(i==b[i1][0]&&j==b[i1][1])
            {

                ////alert("999");
                if(i==b[i1-1][0])
                {
                   if(j<b[i1-1][1])
                   {
                       for(let i2=j;i2<b[i1-1][1]+1;i2++)
                       {
                            aa[i][i2]=me;
                            ischange++;
                       }
                   }
                   if(j>b[i1-1][1])
                   {
                       for(let i2=j;i2>b[i1-1][1]-1;i2--)
                       {
                            aa[i][i2]=me;
                            ischange++;
                       }
                   }
                }
                if(j==b[i1-1][1])
                {
                   if(i<b[i1-1][0])
                   {
                       for(let i2=i;i2<b[i1-1][0]+1;i2++)
                       {
                            aa[i2][j]=me;
                            ischange++;
                       }
                   }
                   if(i>b[i1-1][0])
                   {
                       for(let i2=i;i2>b[i1-1][0]-1;i2--)
                       {
                            aa[i2][j]=me;
                            ischange++;
                       }
                   }
                }
                if(i!=b[i1-1][0]&&j!=b[i1-1][1])
                {
                    if(i>b[i1-1][0]&&j>b[i1-1][1])
                    {
                        for(let p=b[i1-1][0];p<i+1;p++)
                        {
                            q=b[i1-1][1]+(p-b[i1-1][0]);
                            aa[p][q]=me;
                            ischange++;
                        }
                    }
                    if(i<b[i1-1][0]&&j<b[i1-1][1])
                    {
                        for(let p=b[i1-1][0];p>i-1;p--)
                        {
                            q=b[i1-1][1]+(p-b[i1-1][0]);
                            aa[p][q]=me;
                            ischange++;
                        }
                    }
                    if(i>b[i1-1][0]&&j<b[i1-1][1])
                    {
                        for(let p=b[i1-1][0];p<i+1;p++)
                        {
                            q=b[i1-1][1]-(p-b[i1-1][0]);
                            aa[p][q]=me;
                            ischange++;
                        }
                    }
                    if(i<b[i1-1][0]&&j>b[i1-1][1])
                    {
                        for(let p=b[i1-1][0];p>i-1;p--)
                        {
                            q=b[i1-1][1]-(p-b[i1-1][0]);
                            aa[p][q]=me;
                            ischange++;
                        }
                    }
                }
                b[i1][0]=0;
                b[i1][1]=0;
            }
        }

        //棋局有变化
        if(ischange)
        {
            for(let m=1;m<9;m++)
            {
                for(let n=1;n<9;n++)
                {
                    if(aa[m][n]==me)
                    {
                        drawpiece(n,m,0);
                    }
                }
            }
            me=!me;
            removeTip();
            //alert(load_number);
            searchAllLoad()
            huiHe_change++;
            //alert(load_number);
            tip();
            //freshpiece();
        }
        
        //计数黑白棋子，并显示
        let hei=0;
        let bai=0;
        for(let ab=1;ab<9;ab++)
        {
            for(let ac=1;ac<9;ac++)
            {
                if(aa[ab][ac]==1)
                {
                    hei++;
                }
                if(aa[ab][ac]==0)
                {
                    bai++;
                }
            }
        }
        $("#fenshubiao").val(hei+" : "+bai);

        //对手无路可走
        if(load_number==0)
        {
            //改变立场
            if(hei+bai<64)
            {
                if(me==1)
                {
                    alert("黑棋无路可走，该白棋走！");
                }
                if(me==0)
                {
                    alert("白棋无路可走，该黑棋走！");
                }
            }
            me=!me;
            searchAllLoad();
            huiHe_change++;
            tip();
            //再次无路可走，可判别输赢
            if(load_number==0)
            {
                if(hei>bai)
                {
                    alert("恭喜黑方获胜");
                    return;
                }
                else
                {
                    if(hei<bai)
                    {
                        alert("恭喜白方获胜");
                        return;
                    }
                    else{
                        alert("平局");
                        return;
                    }
                    
                }
            }
        }

        //改变回合数
        if(huiHe_change==3)
        {
            huiHe_change=1;
            huiHe_number++;
            $("#huihe_btn").val(huiHe_number);
        }

        action_1();
    }



//音效开关
$("#music_button").click
(
    function music_on()
    { 
        if($("#music_button").val()=="开")
        {
            ////////alert($("#music_button").val());
            $("#music_button").val("关"); 
        }
        else
        {
             $("#music_button").val("开");
        }
    }
)

//先手设置
//function setFir()
//{
    $("#but1").click
(
    function fir_piece()
    { 
        if($("#but1").val()=="黑棋先行")
        {
            ////////alert($("#music_button").val());
            $("#but1").val("白棋先行"); 
            me=0;
            $("#time_down0").text("白方");
            removeTip();
            searchAllLoad();
            huiHe_change++;
            tip();
        }
        else
        {
             $("#but1").val("黑棋先行");
             me=1;
             $("#time_down0").text("黑方");
             removeTip();
             searchAllLoad();
            huiHe_change++;
            tip();
        }
    }
)
//}


//显示与隐藏菜单栏
$("#show_menu_btn").click
(
    function showmenu()
    {
        if($("#show_menu_btn").val()=="显示菜单")
        {
            $("#menu").show();
            $("#show_menu_btn").val("隐藏菜单");
        }
        else
        {
            $("#menu").hide();
            $("#show_menu_btn").val("显示菜单");
        }
    }
)

//寻求路径函数
function searchLoad(x,y)
{
    ////////alert("gg");
    var who=me;
    var you=1;
    if(me==1)
    {
        you=0;
    }
    if(a[x][y]==you||a[x][y]==2){return;}
    if(a[x][y]==who)
    {
        //上
        for(let k=x-1;k>0;k--)
        {
            if(a[x-1][y]==2||a[x-1][y]==who){break;}
            if(a[k][y]==who){break;}
            if(a[k][y]==you){continue;}
            if(a[k][y]==2)
            {
                b[0][0]=0;
                b[0][1]=0;
                b[load_number*2+1][0]=x;
                b[load_number*2+1][1]=y;
                b[load_number*2+2][0]=k;
                b[load_number*2+2][1]=y;
                load_number++;
                //////alert("上");
                break;
            }
        }
        //右上
        for(let k=x-1;k>0&&(y+(x-k))<=8;k--)
        {
            if(a[x-1][y+1]==2||a[x-1][y+1]==who){break;}
            if(a[k][y+(x-k)]==who){break;}
            if(a[k][y+(x-k)]==you){continue;}
            if(a[k][y+(x-k)]==2)
            {
                b[0][0]=0;
                b[0][1]=0;
                b[load_number*2+1][0]=x;
                b[load_number*2+1][1]=y;
                b[load_number*2+2][0]=k;
                b[load_number*2+2][1]=y+(x-k);
                load_number++;
                //////alert("右上");
                break;
            }
        }
        //右
        for(let k=y+1;k<9;k++)
        {
            if(a[x][y+1]==2||a[x][y+1]==who){break;}
            if(a[x][k]==who){break;}
            if(a[x][k]==you){continue;}
            if(a[x][k]==2)
            {
                b[0][0]=0;
                b[0][1]=0;
                b[load_number*2+1][0]=x;
                b[load_number*2+1][1]=y;
                b[load_number*2+2][0]=x;
                b[load_number*2+2][1]=k;
                load_number++;
                //////alert("右");
                break;
            }
        }
        //右下
        for(let k=x+1;k<9&&(y+(k-x))<9;k++)
        {
            if(a[x+1][y+1]==2||a[x+1][y+1]==who){break;}
            if(a[k][y+(k-x)]==who){break;}
            if(a[k][y+(k-x)]==you){continue;}
            if(a[k][y+(k-x)]==2)
            {
                b[0][0]=0;
                b[0][1]=0;
                b[load_number*2+1][0]=x;
                b[load_number*2+1][1]=y;
                b[load_number*2+2][0]=k;
                b[load_number*2+2][1]=y+(k-x);
                load_number++;
                //////alert("4");
                break;
            }
        }
        //下
        for(let k=x+1;k<9;k++)
        {
           
            if(a[x+1][y]==2||a[x+1][y]==who){break;}
            if(a[k][y]==who){break;}
            if(a[k][y]==you){continue;}
            if(a[k][y]==2)
            {
                b[0][0]=0;
                b[0][1]=0;
                b[load_number*2+1][0]=x;
                b[load_number*2+1][1]=y;
                b[load_number*2+2][0]=k;
                b[load_number*2+2][1]=y;
                load_number++;
                //////alert("下");
                break;
            }
        }
        //左下
        for(let k=x+1;k<9&&(y-(k-x))>0;k++)
        {
            if(a[x+1][y-1]==2||a[x+1][y-1]==who){break;}
            if(a[k][y-(k-x)]==who){break;}
            if(a[k][y-(k-x)]==you){continue;}
            if(a[k][y-(k-x)]==2)
            {
                b[0][0]=0;
                b[0][1]=0;
                b[load_number*2+1][0]=x;
                b[load_number*2+1][1]=y;
                b[load_number*2+2][0]=k;
                b[load_number*2+2][1]=y-(k-x);
                load_number++;
                //////alert("左下");
                break;
            }
        }
        //左
        for(let k=y-1;k>0;k--)
        {
            if(a[x][y-1]==2||a[x][y-1]==who){break;}
            if(a[x][k]==who){break;}
            if(a[x][k]==you){continue;}
            if(a[x][k]==2)
            {
                b[0][0]=0;
                b[0][1]=0;
                b[load_number*2+1][0]=x;
                b[load_number*2+1][1]=y;
                b[load_number*2+2][0]=x;
                b[load_number*2+2][1]=k;
                load_number++;
                //////alert("左");
                break;
            }
        }
        //左上
        for(let k=x-1;k>0&&(y-(x-k))>0;k--)
        {
            if(a[x-1][y-1]==2||a[x-1][y-1]==who){break;}
            if(a[k][y-(x-k)]==who){break;}
            if(a[k][y-(x-k)]==you){continue;}
            if(a[k][y-(x-k)]==2)
            {
                b[0][0]=0;
                b[0][1]=0;
                b[load_number*2+1][0]=x;
                b[load_number*2+1][1]=y;
                b[load_number*2+2][0]=k;
                b[load_number*2+2][1]=y-(x-k);
                load_number++;
                //////alert("左上");
                break;
            }
        }
    }
}

//求所有路径
function searchAllLoad()
{
    load_number=0;
    for(let i=1;i<9;i++)
    {
        for(let j=1;j<9;j++)
        {
            searchLoad(i,j);
        }
    }
}

//提示路径
function tip()
{
    //alert(b);
    for(let i=2;i<load_number*2+2;i=i+2)
    {
        //////alert(i);
        drawpiece(b[i][1],b[i][0],1);
        //////alert("666");
    }
}

//主函数
function main()
{
    if(start==0)
    {
        //////alert("请按开始按钮开始！");
        return;
    }
    else
    {
        //////alert(a[4][4]);
        initpiece();
        //////alert(a[4][4]);
       // while(1)
        {
            searchAllLoad();
            //////alert(load_number);
            //////alert("999");
            //////alert(b);
            tip();
            //////alert("hhhhh");
            //downPiece();
            //freshpiece();
            if(start==0)
            {
                //////alert("tuichu");
                return;
            }
        }
    }
}

$("#start_game").click
(
    function startGame()
    {
        if(($("#start_game").val())=="开始游戏" )
        {
            $("#start_game").val("结束游戏");
            start=1;
        }
        else
        {
            $("#start_game").val("开始游戏");
            start=0;
        }
        
    }

)


