
ImageProxy = function(frameUrl)
{
	this.iframe = document.createElement("iframe"); 
	
  	this.iframe.src = frameUrl;
  	
	this.iframe.style.width = 1 + "px"; 
	this.iframe.style.height = 1 + "px"; 
	this.iframe.style.top = 0 + "px";
	this.iframe.style.left = 0 + "px";
	this.iframe.style.position = "absolute";
	this.iframe.frameBorder = 0;	
	document.body.appendChild(this.iframe);
	
	window.addEventListener('message', this.onMessage.bind(this));
}

ImageProxy.constructor = ImageProxy;

ImageProxy.prototype.setImageSrc = function(image, src)
{
	this.image = image;
	
	this.src = src;
	
	if(this.target)
	{
		this.iframe.contentWindow.postMessage(this.src, "*");	
	}
}

ImageProxy.prototype.onMessage = function(event)
{
	if(event.data == "loaded")
	{
		this.target = event.source;
		
		if(this.src)
		{
			this.target.postMessage(this.src, "*");	
		}
	}
	else
	{
		this.image.src = event.data;
	}	
}



// create an instance!

