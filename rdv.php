<?php 
/*
Template Name: Rendez-vous
*/

get_header(); 
?>

	<?php if ( have_posts() ) : ?>

		<?php while ( have_posts() ) : the_post(); ?>

			<section class='head headRdv'>

				<div id="bgHead"></div>

				<div class='content main'>
					<h1><?php the_field('rdvTitre1', 'options'); ?> <span><?php the_field('rdvTitre2', 'options'); ?></span></h1>
					<ul class='filtres'>
						<?php 

						$ID = get_the_ID(); 
						$currentPage = get_permalink( $ID );

						$rdv = isset($_GET['cat']) ? $_GET['cat'] : '';

						$today = date('Ymd'); 

						if(empty($rdv)){
							$args = array( 'post_type' => 'rdv', 'posts_per_page' => -1, 'meta_query' => array( array( 'key' => 'rdvDate', 'compare' => '>=', 'value' => $today ) ), 'orderby' => 'meta_value_num', 'order' => 'ASC' );
						}else{
							$args = array( 'post_type' => 'rdv', 'posts_per_page' => -1, 'meta_query' => array( array( 'key' => 'rdvDate', 'compare' => '>=', 'value' => $today ) ), 'orderby' => 'meta_value_num', 'order' => 'ASC', 'tax_query' => array( array( 'taxonomy' => 'catRdv', 'field' => 'slug', 'terms' => $rdv ) ));
						}
						$loop = new WP_Query( $args );

						$cats = get_terms('catRdv');
						foreach($cats as $cat) : 

						?><!--

							--><li>
								<a href='<?php if($cat->slug == $rdv){ echo $currentPage; }else{ echo $currentPage . '?cat=' . $cat->slug; } ?>' title='<?php if($cat->slug == $rdv){ _e('Désactiver le filtre', 'wisembly'); }else{ echo __('Les', 'wisembly') . ' ' . $cat->name . ' ' . __('à venir', 'wisembly'); } ?>' class='<?php echo $cat->slug; if($cat->slug == $rdv) echo " actif"; ?>'><?php echo $cat->name; ?></a>
							</li><!--

						--><?php 

						endforeach;

						?>
					</ul>
				</div>

			</section>

			<div class='wrapper' role='main'>

				<div id="bg-blanc" <?php if( !$loop->have_posts() ){ echo " style='top:-35px'"; }?>></div>

				<section class='content bgBlanc paddingBottom'>

					<?php

					if( $loop->have_posts() ){
						while( $loop->have_posts() ) : $loop->the_post(); 

						$theCats = get_the_terms( $post->ID, 'catRdv' );
 
						$date = get_field('rdvDate'); 
						$srtDate = strtotime($date);
						$dateOk = date_i18n('l d F', $srtDate);
						$dateOkMaj = ucfirst(strtolower(trim($dateOk)));

						
					?>
							<article class='scrollHere rdv'>
								<div class='roundImg'><?php the_post_thumbnail('thumbnail'); ?></div>

								<?php if ( $theCats ) :
									foreach ( $theCats as $theCat ) : ?>
									<a href='<?php echo $currentPage . '?cat=' . $theCat->slug; ?>' title='<?php echo __('Les', 'wisembly') . ' ' . $theCat->name . ' ' . __('à venir', 'wisembly'); ?>' class='<?php echo $theCat->slug; ?>'><?php echo $theCat->name; ?></a>
								<?php endforeach;
								endif; ?>

								<h2><?php the_title(); ?></h2>
								<?php the_content(); ?>
								<span class='date'><?php echo $dateOkMaj . ' ' . __('à', 'wisembly') . ' '; the_field('rdvTime'); ?></span>
								<a href='<?php the_field('rdvLink'); ?>' class='btnLight' target='_blank'><?php the_field('rdvTxtLink'); ?></a>
								<button class='icon-down scrollNext'><span></span></button>
							</article>

					<?php
						endwhile;
					}else{
						if(empty($rdv)){
							echo "<article class='scrollHere'><p>" . __("Pas d'événements à venir !", 'wisembly') . "</p><button class='icon-down scrollNext'><span></span></button></article>";
						}else{
							$actualCat = get_term_by('slug', $rdv, 'catRdv');
							echo "<article class='scrollHere'><p>" . __("Pas de", 'wisembly') . ' ' . $actualCat->name . ' ' . __("à venir !", 'wisembly') . "</p><button class='icon-down scrollNext'><span></span></button></article>";
						}
					}

					wp_reset_query();
					?>

					<div class='scrollHere'>
						<?php the_content(); ?>
						<a class='prevLink lienVert' href='<?php echo get_post_type_archive_link( 'rdv' ); if(!empty($rdv)){ echo '?cat=' . $rdv; } ?>' title='<?php _e('Evénements passés', 'wisembly'); ?>' class='lienVert'><?php the_field('rdvBtn'); ?></a>
					</div>

				</section>

			</div>
		
		<?php endwhile; ?>
	
	<?php else : ?>
				
		<h1>404</h1>

	<?php endif; ?>

<?php get_footer(); ?>