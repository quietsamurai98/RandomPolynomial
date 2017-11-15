var gen_term = function(degree, min_coeff, max_coeff){
	max_coeff++; //to be inclusive
	
	let out = "";
	
	let coeff = ((Math.random() * (max_coeff-min_coeff))+min_coeff) | 0;
	if(coeff>=0){
		out+="+";
	}
	out+=coeff;
	if(degree){
		out+="x";
		if(degree!=1){
			out+="^"+degree;
		}
	}
	return coeff?out:""; // VxVn[0*x^n == 0], so replace any term with a coefficient of 0 with nothing
}

var gen_poly = function(min_degree, max_degree, min_coeff, max_coeff, space_density, is_definite){
	let out = "";
	for(var i = max_degree; i >= min_degree; i--){
		if(i!==-1){
			out+=gen_term(i, min_coeff, max_coeff);
		}
	}
	if(out.charAt(0) == '+'){
		out=out.substr(1);
	}
	out = sprinkle_spaces(out, space_density);
	
	if(is_definite){
		let start = ((Math.random() * (max_coeff-1-min_coeff))+min_coeff) | 0;
		let end   = ((Math.random() * (max_coeff-start))+start) | 0;
		while(start === end){
			let end   = ((Math.random() * (max_coeff-start))+start) | 0;
		}
		out=start+"|"+end+" "+out+" dx";
	} else {
		out="| "+out+" dx";
	}
	return out;
}

var sprinkle_spaces = function(str, space_density){
	let num_spaces = (str.length * space_density) | 0;
	for(let i = 0; i < num_spaces; i++){
		let index = (Math.random() * str.length) | 0;
		str = str.substring(0,index)+" "+str.substring(index);
	}
	return str;
}

var generate_polynomial = function(){
	var table = document.getElementById("results_table");
	var row = table.insertRow(-1);
	var cell = row.insertCell(0);
	cell.innerText = gen_poly(
		parseInt(document.getElementById("min_deg").value),
		parseInt(document.getElementById("max_deg").value),
		parseInt(document.getElementById("min_coeff").value),
		parseInt(document.getElementById("max_coeff").value),
		parseInt(document.getElementById("add_space").value) / 100.0,
		document.getElementById("is_definite").checked
	)
}
