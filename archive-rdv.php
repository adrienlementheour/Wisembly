<?php get_header(); ?>


			<section class='head headRdv'>

				<div id="bgHead"></div>

				<div class='content main'>
					<h1><?php the_field('rdvTitre1', 'options'); ?> <span><?php the_field('rdvTitre2', 'options'); ?></span></h1>
					<ul class='filtres'>
						<?php

						$rdv = isset($_GET['cat']) ? $_GET['cat'] : '';

						$today = date('Ymd'); 

						$nbPosts = 5; // also set in functions.php //
						if( get_query_var('paged') ){
							$paged = get_query_var('paged');
						}else if( get_query_var('page') ){
							$paged = get_query_var('page');
						}else{
							$paged = 1;
						}

						if(!empty($rdv)){
							$args = array( 'post_type' => 'rdv', 'tax_query' => array( array( 'taxonomy' => 'catRdv', 'field' => 'slug', 'terms' => $rdv ) ), 'meta_query' => array( array( 'key' => 'rdvDate', 'compare' => '<=', 'value' => $today ) ), 'orderby' => 'meta_value_num', 'order' => 'DESC', 'paged' => $paged );
						}else{
							$args = array( 'post_type' => 'rdv', 'meta_query' => array( array( 'key' => 'rdvDate', 'compare' => '<=', 'value' => $today ) ), 'orderby' => 'meta_value_num', 'order' => 'DESC', 'paged' => $paged );
						}
						global $loop;
						$loop = new WP_Query($args);


						$cats = get_terms('catRdv');
						foreach($cats as $cat) : 

						?><!--

							--><li>
								<a href='<?php if($cat->slug == $rdv){ echo get_post_type_archive_link( 'rdv' ); }else{ echo get_post_type_archive_link( 'rdv' ) . '?cat=' . $cat->slug; } ?>' title='<?php if($cat->slug == $rdv){ _e('Désactiver le filtre', 'wisembly'); }else{ echo __('Les', 'wisembly') . ' ' . $cat->name . ' ' . __('passés', 'wisembly'); } ?>' class='<?php echo $cat->slug; if($cat->slug == $rdv) echo " actif"; ?>'><?php echo $cat->name; ?></a>
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

					<article class='scrollHere rdv'>
					<h2 class="noMarginTop"><?php _e("Rendez-vous passés", 'wisembly'); ?></h2>
					<p class="noMarginBottom"><?php _e("Retrouvez ici les rendez-vous que vous avez manqué ! ", 'wisembly'); ?><br />
						<a class='nextLink lienVert' href='<?php the_field('page_rdv', 'options'); if(!empty($rdv)){ echo '?cat=' . $rdv; } ?>' title='<?php _e('Retour aux rendez-vous en cours', 'wisembly'); ?>'><?php _e('Retour aux rendez-vous en cours', 'wisembly'); ?></a>
					</p>
					<button class='icon-down scrollNext'><span></span></button>
					</article>
					<?php

					if( $loop->have_posts() ){

						while( $loop->have_posts() ) : $loop->the_post(); 

						$theCats = get_the_terms( $post->ID, 'catRdv' );
 
						$date = get_field('rdvDate'); 
						$srtDate = strtotime($date);
						$dateOk = date_i18n('l d F Y', $srtDate);
						$dateOkMaj = ucfirst(strtolower(trim($dateOk)));

						$next_post = get_previous_post(); // if true -> Dernier rdv //

						
					?>

							<article class='scrollHere rdv'>
								<div class='roundImg pastRdv'><span class="pastMask"><?php _e("Passé", 'wisembly'); ?></span><?php the_post_thumbnail('thumbnail'); ?></div>

								<?php if ( $theCats ) :
									foreach ( $theCats as $theCat ) : ?>
									<a href='<?php echo get_post_type_archive_link( 'rdv' ) . '?cat=' . $theCat->slug; ?>' title='<?php echo __('Les', 'wisembly') . ' ' . $theCat->name . ' ' . __('à venir', 'wisembly'); ?>' class='<?php echo $theCat->slug; ?>'><?php echo $theCat->name; ?></a>
								<?php endforeach;
								endif; ?>

								<h2><?php the_title(); ?></h2>
								<?php the_content(); ?>
								<span class='date smallPadBot'><?php echo $dateOkMaj ?></span>
								<button class='icon-down scrollNext'><span></span></button>
							</article>

							

					<?php
						endwhile; ?>
						<article class='scrollHere'>
							<p><a class='nextLink lienVert' href='<?php the_field('page_rdv', 'options'); if(!empty($rdv)){ echo '?cat=' . $rdv; } ?>' title='<?php _e('Retour aux rendez-vous en cours', 'wisembly'); ?>'><?php _e('Retour aux rendez-vous en cours', 'wisembly'); ?></a></p>
						</article>
					<?php
					}else{
						if(empty($rdv)){
							echo $rdv;
							echo "<article class='scrollHere'><p>" . __("Pas d'événements passés !", 'wisembly') . "</p></article>";
						}else{
							$actualCat = get_term_by('slug', $rdv, 'catRdv');
							echo "<article class='scrollHere'><p>" . __("Pas de", 'wisembly') . ' ' . $actualCat->name . ' ' . __("passés !", 'wisembly') . "</p></article>";
						}
					}

					?>

					<div class='pagination scrollHere'>
						<?php echo paginate_links( array( 'total' => $loop->max_num_pages, 'prev_text' => __('‹ Précédent'), 'next_text'  => __('Suivant ›') ) ); ?>
					</div>

				</section>

			</div>

<?php get_footer(); ?>