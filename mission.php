<?php 
/*
Template Name: Mission & Vision
*/

get_header(); 
?>

	<?php if ( have_posts() ) : ?>

		<?php while ( have_posts() ) : the_post(); ?>

			<section class='head headMissionVision'>
					<div id="bgHead"></div>
					<div class='content main'>
						<h1><?php the_field('missionTitre1'); ?><br /> <?php the_field('missionTitre2'); ?><br /> <span><?php the_field('missionTitre3'); ?></span></h1>
					</div>
			</section>

			<section class='wrapper content bgBlanc scrollHere noMarginResponsive'>
					<h2 class='noMarginTop'><?php the_title(); ?></h2>
					<?php the_content(); ?>
					<div id="wrapper-slider-visu-mission">
						<ul id="slider-visu-mission">
							<li class="visu-work-hard-play-hard">
								<a href="#">
									<img class="img-couleur-slider-visu-mission" src="<?php the_field('imageValeur1'); ?>">
								</a>
							</li><li class="visu-clients-not-customers">
								<a href="#">
									<img class="img-couleur-slider-visu-mission" src="<?php the_field('imageValeur2'); ?>">
								</a>
							</li><li class="visu-open-the-way" class="active">
								<a href="#">
									<img class="img-couleur-slider-visu-mission" src="<?php the_field('imageValeur3'); ?>">
								</a>
							</li><li class="visu-think-big-get-big">
								<a href="#">
									<img class="img-couleur-slider-visu-mission" src="<?php the_field('imageValeur4'); ?>">
								</a>
							</li><li class="visu-we-are-wisembly">
								<a href="#">
									<img class="img-couleur-slider-visu-mission" src="<?php the_field('imageValeur5'); ?>">
								</a>
							</li>
						</ul>
						<ul id="slider-txt-mission">
							<li id="txt-work-hard-play-hard">
								<h3><?php the_field('valeur1'); ?></h3>
								<p><?php the_field('texteValeur1'); ?></p>
							</li><li id="txt-clients-not-customers">
								<h3><?php the_field('valeur2'); ?></h3>
								<p><?php the_field('texteValeur2'); ?></p>
							</li><li id="txt-open-the-way">
								<h3><?php the_field('valeur3'); ?></h3>
								<p><?php the_field('texteValeur3'); ?></p>
							</li><li id="txt-think-big-get-big">
								<h3><?php the_field('valeur4'); ?></h3>
								<p><?php the_field('texteValeur4'); ?></p>
							</li><li id="txt-we-are-wisembly">
								<h3><?php the_field('valeur5'); ?></h3>
								<p><?php the_field('texteValeur5'); ?></p>
							</li>
						</ul>
					</div>
					<button id="next-slider-mission">›</button>
					<button class='icon-down scrollNext'><span></span></button>
				</section>
		
		<?php endwhile; ?>
	<?php endif; ?>

	<?php 
		$loop2 = new WP_Query( array( 'post_type' => 'histoire', 'posts_per_page' => -1, 'meta_key'	=> 'date_histoire', 'orderby' => 'meta_value_num', 'order' => 'ASC' ) ); 
	?>

	<?php if ( $loop2->have_posts() ) : ?>

		<section class='wrapper content bgBlanc scrollHere'>
			<h2>Notre histoire</h2>
			<ul id="notre-histoire">
				<?php while ( $loop2->have_posts() ) : $loop2->the_post(); ?>
					<li class="clearfix">
						<div class="deco-histoire"></div>
						<?php $mydate = new DateTime( get_field('date_histoire') ); ?>
						<div class="date-histoire"><?php echo date_i18n("F Y",$mydate->getTimestamp()) ?></div>
						<div class="content-histoire">
							<h3><?php the_title(); ?></h3>
							<p><?php the_content(); ?></p>
						</div>
					</li>
				<?php endwhile; ?>
			</ul>
			<!--<button class='icon-down scrollNext'><span></span></button>-->
		</section>
		<!--<section class='wrapper content bgBlanc scrollHere'>
			<h2>S'inscrire à notre newsletter</h2>
		</section>-->	
	<?php endif; ?>

<?php get_footer(); ?>