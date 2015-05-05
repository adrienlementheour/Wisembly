<?php 
/*
Template Name: Livres blancs
*/

get_header(); 
?>

	<?php if ( have_posts() ) : ?>

		<?php while ( have_posts() ) : the_post(); ?>

			<section class='head headLivres'>

				<div id="bgHead"></div>

				<div class='content main'>
					<h1><?php the_field('livresTitre1'); ?> <span><?php the_field('livresTitre2'); ?></span></h1>
				</div>

			</section>

			<div class='wrapper' role='main'>

				<div id="bg-blanc"></div>

				<section class='content bgBlanc paddingBottom'>

					<h2 class='noMarginTop'><?php the_title(); ?></h2>

					<ul class='listeLivres'>

						<?php 

							if( get_query_var('paged') ){
								$paged = get_query_var('paged');
							}else if( get_query_var('page') ){
								$paged = get_query_var('page');
							}else{
								$paged = 1;
							}

							$loop = new WP_Query( array( 'post_type' => 'livres', 'posts_per_page' => 9, 'paged' => $paged ) );

							if( $loop->have_posts() ) :
								while( $loop->have_posts() ) : $loop->the_post(); 
						?><!--

								--><li>
									<?php echo wp_get_attachment_image( get_field('livreCouv'), 'couv-thumb' ); ?>
									<h3><?php the_title(); ?></h3>
									<p><?php the_field('livreSousTitre'); ?></p>
									<a href='<?php the_permalink(); ?>' class='btnLight smaller'><?php _e('Télécharger', 'wisembly'); ?></a>
								</li><!--

						--><?php

								endwhile;

							endif;

						?>

					</ul>

					<div class='pagination'>
						<?php echo paginate_links( array( 'total' => $loop->max_num_pages, 'prev_text' => '<b>‹</b> <span>' . __('Précédent') . '</span>', 'next_text'  => '<span>' . __('Suivant') . '</span> <b>›</b>' ) ); ?>
					</div>

					<?php wp_reset_query(); ?>
				</section>

			</div>
		
		<?php endwhile; ?>
	
	<?php else : ?>
				
		<h1>404</h1>

	<?php endif; ?>

<?php get_footer(); ?>