//fichier permettant à l'utilisateur de modifier la base de donnée à l'aide de fichier de configuration

/**
 * { Fonction permettant de modifier la bdd grâce à un fichier de configuration}
 *
 * @method     modifier_bdd
 * @param      {string}  argv    { le contenue du fichier chargé }
 */
ElizaBot.prototype.modifier_bdd = function(argv) {
	var data = argv.split("</data>");//on insole chaque reponse
	var result, tmp;
	var a=0;
	for(var a in data)//pour toute les lignes
	{
		if(a < data.length - 1)
		{
			//on enleve le <data> de deubt de chaque  
			data[a] = data[a].substring(8, data[a].length); // 5 = <data> -1
			data[a] = data[a].split("</motcle>");//on split pour connaitre les mots clé
			data[a][0] = data[a][0].substring(9, data[a][0].length);
			data[a][1] = data[a][1].split("</reponse>");
			data[a][1][0] = data[a][1][0].substring(11, data[a][1][0].length);
			data[a][1][1] = data[a][1][1].substring(7, data[a][1][1].length-7);
			
			result = [];
			result.push(data[a][0]);
			result.push(data[a][1][0]);
			result.push(data[a][1][1]);
	
			// Si les données du fichier sont des tableaux
			if((result[0].split(",")).length > 1)
			{
				result[0] = result[0].substring(1, result[0].length-1);
				result[0] = result[0].split(",");
			}
			else
			{
				tmp = result[0];
				result[0] = [];
				result[0].push(tmp);
			}
			if((result[1].split(",")).length > 1)
			{
				result[1] = result[1].substring(1, result[1].length-1);
				result[1] = result[1].split(",");
			}
			else
			{
				tmp = result[1];
				result[1] = [];
				result[1].push(tmp);
			}
			if((result[2].split(",")).length > 1)
			{
				result[2] = result[2].substring(1, result[2].length-1);
				result[2] = result[2].split(",");
			}
			else
			{
				tmp = result[2];
				result[2] = [];
				result[2].push(tmp);
			}
			
			Eliza.ajouter_reponse(new Reponse(result[0], result[1], result[2]));
		}
	}
};

/**
 * { Permet de télécharger le fichier de configuration }
 *
 * @method     exporter_bdd
 */
ElizaBot.prototype.exporter_bdd = function()
{
	var result = "\n";
	var a;
	for(var i in this.ensemble_rep)
	{
		a=this.ensemble_rep[i];
		result += "<data>\n";
		result += "\t<motcle>";
		if(typeof a.mots_cle != "string")
		{
			result+="[";
			result+=a.mots_cle; 
			result+="]";
		}
		else
		{
			result+=a.mots_cle; 	
		}
		result += "</motcle>\n";
		result += "\t<reponse>";

		if(typeof a.ensemble_def != "string")
		{
			result+="[";
			result+=a.ensemble_def; 
			result+="]";
		}
		else
		{
			result+=a.ensemble_def; 
		}
		result += "</reponse>\n";

		result += "\t<dep>";
		if(typeof a.ensemble_dependance != "string")
		{
			result+="[";
			result+=a.ensemble_dependance; 
			result+="]";
		}
		else
		{
			result+=a.ensemble_dependance; 
		}
		result += "</dep>\n";
		result += "</data>\n"
	}
	result = result.substring(0, result.length-1);
	//Création d'un objet LIEN
    var bu = document.getElementById('down');
    bu.setAttribute("href", "data:text/plain;charset=utf-8,"+encodeURIComponent(result));

    //Nom du fichier
    //bu.setAttribute("download", "lol.txt");

    //Simulation d'un click
    bu.click();
}

/**
 * { Permet à l'utilisateur d'ajouter des réponses ou de les modifier visuellement }
 *
 * @method     maintenance_bdd
 */
ElizaBot.prototype.maintenance_bdd = function() {
	var d = document.getElementById("div_def_submit_voir");
	var div = document.getElementById("div_def");
	var affiche = "Afficher définitions", cacher = "Cacher définitions";

	if(d.value == affiche)
	{
		d.value = cacher;
		var text_cle, text_def, text_dep, a;
		var div2;
		for(var i in this.ensemble_rep)
		{
			div2 = document.createElement("p");
			div2.setAttribute("class", "div_def_para");
			a = this.ensemble_rep[i];
			text_cle = document.createElement("input");
			text_cle.setAttribute("type", "text");
			text_cle.setAttribute("id", "div_def_cle");
			text_cle.setAttribute("value", a.mots_cle);

			text_def = document.createElement("input");
			text_def.setAttribute("type", "text");
			text_def.setAttribute("id", "div_def_def");
			text_def.setAttribute("value", a.ensemble_def);

			text_dep = document.createElement("input");
			text_dep.setAttribute("type", "text");
			text_dep.setAttribute("id", "div_def_dep");
			text_dep.setAttribute("value", a.ensemble_dependance);

			div2.appendChild(text_cle);
			div2.appendChild(text_def);
			div2.appendChild(text_dep);
			div.appendChild(div2);
		}
	}
	else if(d.value = cacher)
	{
		//on clear le div
		d.value = affiche;
		div.innerHTML = "";
	}
};
