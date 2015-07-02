<!DOCTYPE html>
<!--[if lt IE 9]> <html class="no-js lt-ie9 lt-ie10" lang='fr'> <![endif]-->
<!--[if IE 9]> <html class="no-js lt-ie10" lang='fr'> <![endif]-->
<!--[if gt IE 9]><!--> <html class="no-js" lang='fr'> <!--<![endif]-->

	<head>
	  	<meta charset='utf-8'>
	  	<title>Wisembly</title>

	  	<meta name='description' content=''>

	  	<?php include('includes/head.html'); ?>
	  	
	</head>

	<body class='success home page-template'>

		<div id='overflow'>
		
			<?php include('includes/header.html'); ?>
			
			<div id='container'>
				<header id='connectHeader'>
					<form role="search" method="get" id="searchform" action="">
						<input type="search" name="s" id="searchInput" value="" placeholder="Rechercher..."> 
						<button type="submit" id="search" form="searchform">&#xe616;</button> 
					</form>
					
					<div class='secondMenu'>
						<ul class='connectMenu'>
							<li><a href='#'>Rejoindre votre event</a></li>
							<li><a href='#'>Créer un compte</a></li>
							<li><a href='#'>Connexion</a></li>
						</ul>

						<ul class='lang'>
							<li class='actif'>
								<a href='#' title='Français'>FR</a>
							</li><li>
								<a href='#' title='English'>EN</a>
							</li>
						</ul>
					</div>
				</header>

				<section class='head headHome'>
					<div id="bgHead"></div>
					<div class='content main'>
						<p>Le Wisembly Client Success Center a pour objectif de vous accompagner dans la réussite de vos conférences téléphoniques, formations ou séminaires interactifs. <b>Vous trouverez toutes les ressources nécessaires pour devenir autonome sur Wisembly et maîtriser les secrets d’une réunion réussie.</b></p>
						<a class='btnFull' href='#'>Démarrer le Wisembly Trip</a>
					</div>
				</section>

				<div class='wrapper' role='main'>
					<div id="bg-blanc"></div>

					<section class='content scrollHere'>
						<ul class='ressources'>
							<li>
								<h2>Vidéos</h2>
								<article>
									<h3>Préparer un Wiz</h3>
									<p>Apprenez à organiser votre Wiz efficacement en 3 minutes.</p>
									<a href='#' class='btnFull'>Visionner</a>
								</article>
								<p>Et aussi :</p>
								<h4>Animer un Wiz</h4>
							</li><li>
								<h2>Agenda</h2>
								<article>
									<h3>Devenir autonome sur Wisembly</h3>
									<a href='#' class='btnFull'>Je participe !</a>
								</article>
							</li><li>
								<h2>Documents</h2>
								<article>
									<h3>Guide utilisateur</h3>
									<p>Pour devenir un administrateur autonome sur la solution</p>
									<a href='#' class='btnFull'>Télécharger le PDF</a>
								</article>
							</li>
						</ul>
						<button class='icon-down scrollNext'><span></span></button>
					</section>

					<section class='content bgBlanc scrollHere'></section>

				</div>

		  		<?php include('includes/footer.php'); ?>