document.querySelector("button").addEventListener("click",takeInput);
const baseUrl="https://api.github.com/users/";
function takeInput()
{
    const input=document.querySelector("input").value.trim();//trim removes space from start and end.
    if(input!="")
    {
      const url=baseUrl+input;
      apiSearch(url);  
    }
    else{
        alert("Please enter your username!");
        return;
    }
}


// const url="https://api.github.com/users/ashish8112";

function apiSearch(url){
const xhr= new XMLHttpRequest();
xhr.open("GET",url);

//xhr.onreadystatechange → XHR object khud call karta hai, jab bhi readyState change hota hai.
//Matlab tu bas function assign karta hai, aur XHR engine internally monitor karta hai ki request ka state change hua ya nahi.
//Browser ke JS engine me XHR object ka internal event system hai jo readyState change hone par check karta hai:
//Agar function assigned hai → call ho jaata hai automatically
//Tu explicitly call nahi kar raha
//Isi liye hum bolte hain callback function — kyunki function kab execute hoga, wo decide XHR engine karega, na ki hum.
xhr.onreadystatechange = function(){    // event handler when the state of xml changes it runs this function.
    if(xhr.readyState===4)
    {
        const data=JSON.parse(this.responseText);
        if(data.message==="Not Found")
        {
            alert("⚠️ User not found!");
            return;
        }
       else if (data.message === "API rate limit exceeded for 103.48.144.5. (But here's the good news: Authenticated requests get a higher rate limit. Check out the documentation for more details.)") {
                alert("⚠️ You reached GitHub API limit! Wait for 1 hour or use a token.");
                return;
        }
        render(data);
    }
}
xhr.send();
}
function render(data)
{
    const avatar=data.avatar_url;
    const follower= data.followers;
    const name= data.name;
    console.log(avatar);
    console.log(follower);

    //Creating Elements
    let div=document.createElement("div");
    let div01 = document.createElement("div");
    let div02 = document.createElement("div");
    let img= document.createElement("img");
    let heading= document.createElement("h4");
    

    //styling parent div
    div.style.height="25rem";
    div.style.width="25rem";
    div.style.borderRadius="16px";
    div.style.border="2px solid black";
    div.style.display="flex";
    div.style.flexDirection="column";
    div.style.alignItems="center";
    div.style.justifyContent="space-between";
    div.style.overflow="auto";
    div.style.margin="20px 20px";

    //styling div of img 
    div01.style.height="80%";
    div01.style.width="100%";

    // styling img 
    img.style.height="100%";
    img.style.width="100%";

    // innerHTML 
    img.setAttribute("src",avatar);
    div01.append(img);
    heading.innerHTML="Followers ="+follower;
    div02.append("Name = "+name);
    div02.append(heading);


    // appending div01 and div02 in parent 
    div.append(div01);
    div.append(div02);
    document.querySelector("body").append(div);
}