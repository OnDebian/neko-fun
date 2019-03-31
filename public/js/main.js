const toast = Swal.mixin({
	toast: true,
	position: 'top-end',
	showConfirmButton: false,
	timer: 3000
});

function genURL() {
	$.ajax({
		type: "POST",
		url: "/api/shorten",
		data: $("form").serialize(),
		processData: false,
		success: (item) => {
			$("#shorten-urls").css("display", "block");
			$("#shorten-urls").append(`
				<div class="url-shorten">
					<a href="//${item.data.domain}/${item.data.uid}" class="subtitle">
						${item.data.domain}/${item.data.uid}
					</a>
				</div>
			`);
		},
		error: (err) => {
			let error = err.responseJSON;
			if (error) {
				toast.fire({
					"title": error.message,
					"type": "error"
				});
			} else {
				toast.fire({
					"title": "Unknown Error",
					"type": "error"
				});
			}
		}
	});
}

function genConfig(domain, time) {
	let config =
	`
	{
		"Version": "12.4.1",
		"Name": "Neko.fun",
		"DestinationType": "URLShortener",
		"RequestMethod": "POST",
		"RequestURL": "https://neko.fun/api/shortener",
		"Body": "FormURLEncoded",
		"Arguments": {
			"url": "$input$",
			"domain": "${domain}",
			"time": "${time}"
		},
		"URL": "https://$json:data.domain$/$json:data.uid$"
	}
	`;
	let a = document.createElement("a");
	document.body.appendChild(a);
	a.style = "display: none";
	var url = window.URL.createObjectURL(new Blob([config], { type: "octet/stream" }));
	a.href = url;
	a.download = "neko[dot]fun.sxcu";
	a.click();
	window.URL.revokeObjectURL(url);
}

$(document).ready(() => {

	$("#shorten").click((e) => {
		e.preventDefault();
		genURL();
	});

	$("#genconfig").click((e) => {
		e.preventDefault();
		let
			time = $("select[name=time]").val(),
			domain = $("select[name=domains]").val();
		
		genConfig(domain, time);
	});

	$("form").submit(e => {
		e.preventDefault();
	});

});