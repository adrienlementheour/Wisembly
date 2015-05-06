<?php 
/*
Template Name: Emploi
*/

get_header(); ?>
	
	<?php if ( have_posts() ) : ?>

		<?php while ( have_posts() ) : the_post(); ?>

				<section class='head headEmploi'>
					<div id="bgHead"></div>
					<div class='content main'>
						<h1><?php the_field('emploiTitre1') ?> <span><?php the_field('emploiTitre2') ?></span></h1>
					</div>
				</section>

				<div id="bg-blanc"></div>

				<section class='wrapper content bgBlanc scrollHere'>
					<h2 class='noMarginTop'><?php the_field('emploiTitreContent') ?></h2>
					<ul id="avantages-wisembly">
						<?php if(get_field('emploiPicto1')){ ?><!--
							--><li>
								<div class="zone-img-avantages-wisembly"><?php echo wp_get_attachment_image( get_field('emploiPicto1'), 'picto-thumb' ); ?></div>
								<div class="zone-txt-avantages-wisembly"><?php the_field('emploiPicto1Txt') ?></div>
							</li><!--
						--><?php } if(get_field('emploiPicto2')){ ?><!--
							--><li>
								<div class="zone-img-avantages-wisembly"><?php echo wp_get_attachment_image( get_field('emploiPicto2'), 'picto-thumb' ); ?></div>
								<div class="zone-txt-avantages-wisembly"><?php the_field('emploiPicto2Txt') ?></div>
							</li><!--
						--><?php } if(get_field('emploiPicto3')){ ?><!--
							--><li>
								<div class="zone-img-avantages-wisembly"><?php echo wp_get_attachment_image( get_field('emploiPicto3'), 'picto-thumb' ); ?></div>
								<div class="zone-txt-avantages-wisembly"><?php the_field('emploiPicto3Txt') ?></div>
							</li><!--
						--><?php } if(get_field('emploiPicto4')){ ?><!--
							--><li>
								<div class="zone-img-avantages-wisembly"><?php echo wp_get_attachment_image( get_field('emploiPicto4'), 'picto-thumb' ); ?></div>
								<div class="zone-txt-avantages-wisembly"><?php the_field('emploiPicto4Txt') ?></div>
							</li><!--
						--><?php } if(get_field('emploiPicto5')){ ?><!--
							--><li>
								<div class="zone-img-avantages-wisembly"><?php echo wp_get_attachment_image( get_field('emploiPicto5'), 'picto-thumb' ); ?></div>
								<div class="zone-txt-avantages-wisembly"><?php the_field('emploiPicto5Txt') ?></div>
							</li><!--
						--><?php } if(get_field('emploiPicto6')){ ?><!--
							--><li>
								<div class="zone-img-avantages-wisembly"><?php echo wp_get_attachment_image( get_field('emploiPicto6'), 'picto-thumb' ); ?></div>
								<div class="zone-txt-avantages-wisembly"><?php the_field('emploiPicto6Txt') ?></div>
							</li><!--
						--><?php } if(get_field('emploiPicto7')){ ?><!--
							--><li>
								<div class="zone-img-avantages-wisembly"><?php echo wp_get_attachment_image( get_field('emploiPicto7'), 'picto-thumb' ); ?></div>
								<div class="zone-txt-avantages-wisembly"><?php the_field('emploiPicto7Txt') ?></div>
							</li><!--
						--><?php } if(get_field('emploiPicto8')){ ?><!--
							--><li>
								<div class="zone-img-avantages-wisembly"><?php echo wp_get_attachment_image( get_field('emploiPicto8'), 'picto-thumb' ); ?></div>
								<div class="zone-txt-avantages-wisembly"><?php the_field('emploiPicto8Txt') ?></div>
							</li><!--
						--><?php } ?>
					</ul>
					
					<?php the_content(); ?>
									
					<button class='icon-down scrollNext'><span></span></button>
				</section>

				<section class='wrapper content bgBlanc scrollHere'>
					<h2><?php the_field('emploiTitreOffres'); ?></h2>
					
					<div id="container-offres-emploi"><div id="whr_embed_hook"></div></div>

					<div class="bloc-contact">
						<div class="zone-photo-bloc-contact">
							<?php echo wp_get_attachment_image( get_field('emploiImgContact'), 'couv-thumb' ); ?>
						</div><div class="zone-txt-bloc-contact">
							<h3><?php the_field('emploiTitreContact') ?></h3>
							<div class="nom-contact"><?php the_field('emploiNomContact'); ?></div>
							<div><a href="mailto:<?php the_field('emploiMailContact'); ?>" class="lienVert"><?php the_field('emploiMailContact'); ?></a></div>
							<ul class="rs">
								<?php if(get_field('emploiTwitterContact')){ ?>
									<li><a href="<?php the_field('emploiTwitterContact'); ?>" class="icon-tw" target="_blank"><span><?php the_field('emploiNomContact'); _e(' sur', 'wisembly'); ?> Twitter</span></a></li>
								<?php } if(get_field('emloiLinkedinContact')){ ?>
									<li><a href="<?php the_field('emloiLinkedinContact'); ?>" class="icon-in" target="_blank"><span><?php the_field('emploiNomContact'); _e(' sur', 'wisembly'); ?> LinkedIn</span></a></li>
								<?php } ?>
							</ul>
						</div>
					</div>
				</section>

				<section class='wrapper bgBlanc scrollHere'>
					<div id="container-slider-diapos">
						<ul id="slider-diapos">
							<?php 
								$loop = new WP_Query( array('post_type' => 'photo-recrutement', 'posts_per_page' => -1, 'order' => 'ASC') ); 
								if( $loop->have_posts() ) : while( $loop->have_posts() ) : $loop->the_post(); 
							?><!--
								--><li class='<?php the_field('sizePic'); ?>'><?php the_post_thumbnail('recrutement-thumb'); ?></li><!--
							--><?php endwhile; endif; wp_reset_query(); ?>
						</ul>
					</div>

					<button class='icon-down scrollNext'><span></span></button>
				</section>
				
				<?php 
					$loop = new WP_Query( array('post_type' => 'invitation', 'posts_per_page' => -1) ); 
					if( $loop->have_posts() ) :
				?>
					<section class='wrapper content bgBlanc scrollHere'>
						<h2><?php the_field('emploiTitreInvite'); ?></h2>
						<div id="slider-invite" class="slider-emploi carousel">
							<ul>
								<?php while( $loop->have_posts() ) : $loop->the_post();  ?>
									<li>
										<?php the_post_thumbnail(); ?>
										<h3 class='h2'><?php the_title(); ?></h3>
										<div class="date-slider-invite"><?php the_field('invitationDate'); ?></div>
										<div class="place-slider-invite"><?php the_field('invitationLieu'); ?></div>
										<p><?php the_content(); ?></p>
										<a href="<?php the_field('invitationLien'); ?>" class="btnLight" target="_blank"><?php _e('En savoir plus', 'wisembly'); ?></a>
									</li>
								<?php endwhile; ?>
							</ul>
						</div>
				<?php endif; wp_reset_query(); ?>

				<?php 
					$loop = new WP_Query( array('post_type' => 'rh-presse', 'posts_per_page' => -1) ); 
					if( $loop->have_posts() ) :
				?>
					<button class='icon-down scrollNext'><span></span></button>
					</section>
					<section class='wrapper content bgBlanc scrollHere'>
						<h2><?php the_field('emploiTitreParle'); ?></h2>
						<div id="slider-on-parle-de-nous" class="slider-emploi carousel">
							<ul>
								<?php while( $loop->have_posts() ) : $loop->the_post();  ?>
									<li>
										<?php the_post_thumbnail(); ?>
										<h3><?php the_title(); ?></h3>
										<p><?php the_content(); ?></p>
										<a href="<?php the_field('rhPresseLien'); ?>" class="btnLight" target="_blank"><?php _e('En savoir plus', 'wisembly'); ?></a>
									</li>
								<?php endwhile; ?>
							</ul>
						</div>
					</section>
				<?php else : ?>
					</section>
				<?php endif; wp_reset_query(); ?>


		<?php endwhile; ?>
	
	<?php else : ?>
			
		<h1>404</h1>

	<?php endif; ?>

<?php get_footer(); ?>