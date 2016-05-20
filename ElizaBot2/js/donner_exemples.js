/**
 * @method     donner_exemple
 * @param      {String}  mot_clef  { Les mots clés correspondant aux mots clé à donner }
 * @return     {string}  { Réponse incomplete }
 */
ElizaBot.prototype.donner_exemple = function(mot_clef)
{
	var erreur = "Je n'ai malheureusement pas d'exemple à te proposer", 
		bon = "Tu peut regarder cet éxemple pour mieux comprendre cette définition", result="";

	var rep = Eliza.rechercher_correspondance(mot_clef);

	if(rep != undefined)
	{
		var ex = rep.exemple;
		if(ex != "undefined" || ex.length == 1)
		{
			var img = document.createElement("img");
			img.setAttribute("alt", "Un magnifique exemple");
			img.setAttribute("src", "exemple/" + ex);
			img.setAttribute("id", "div_exemple_img");

			var div_ex = document.getElementById('div_exemple');
			div_ex.innerHTML = "";
			div_ex.appendChild(img);
		}
		else
			result = erreur;
		
		result = bon;
	}
	else
		result = erreur;
	return result;
}