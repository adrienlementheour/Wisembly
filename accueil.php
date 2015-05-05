<?php 
/*
Template Name: Accueil
*/

get_header(); 

?>

	<?php if ( have_posts() ) : ?>

		<?php while ( have_posts() ) : the_post(); ?>

			<section class='head headHome'>

				<div id="bgHead"></div>

				<div class='content main'>
					<div class='blocH1'>
						<h1 class='heading'><?php the_field('accueilTitre1'); ?><span><?php the_field('accueilTitre2'); ?></span></h1>
						<h2 class='subHeading'><?php the_field('accueilSousTitre'); ?></h2>
						<a href='#contactezNous' class="btnFull" rel='nofollow'><?php echo $cta; ?></a>
					</div>
				</div>

			</section>

			<div class='wrapper' role='main'>

				<div id="bg-blanc"></div>

				<section class='content scrollHere'>
					<ul class='detailHome'>
						<li class='event'>
							<h3><?php the_field('accueilItem1Titre'); ?></h3>
							<p><?php the_field('accueilItem1Txt'); ?></p>
							<a href='<?php the_field('accueilItem1Lien'); ?>' class='btnLight'><?php the_field('accueilItem1Btn'); ?></a>
						</li><li class='conf'>
							<h3><?php the_field('accueilItem2Titre'); ?></h3>
							<p><?php the_field('accueilItem2Txt'); ?></p>
							<a href='<?php the_field('accueilItem2Lien'); ?>' class='btnLight'><?php the_field('accueilItem2Btn'); ?></a>
						</li><li class='training'>
							<h3><?php the_field('accueilItem3Titre'); ?></h3>
							<p><?php the_field('accueilItem3Txt'); ?></p>
							<a href='<?php the_field('accueilItem3Lien'); ?>' class='btnLight'><?php the_field('accueilItem3Btn'); ?></a>
						</li>
					</ul>
					<button class='icon-down scrollNext'><span></span></button>
				</section>
				
				<section class='content bgBlanc scrollHere'>
					<h2><?php the_field('accueilRefTitre'); ?></h2>

					<?php
						$loop = new WP_Query( array( 'post_type' => 'ref', 'posts_per_page' => -1 ) );
						if( $loop->have_posts() ) :
					?>
						<div id='sliderRef' class='carousel'>

							<ul>
								<?php while( $loop->have_posts() ) : $loop->the_post(); ?><!--

								--><li class='<?php the_field('refTheme'); ?> ref'>
									<a href='<?php the_permalink(); ?>' title='<?php the_field('tooltip', 'options'); ?>' class='lien'>
										<span class='img'><?php the_post_thumbnail('slidesref-logo'); ?></span>
										<span class='txt'><?php the_field('refTxt'); ?></span>
										<span class='hover'>
											<span class='quote'><?php the_field('refQuote'); ?></span>
											<span>
												<?php if(get_field('refQuoteImg')){ $img = get_field('refQuoteImg'); ?>
													<span class='imgQuote'><img src="<?php echo $img['sizes']['slidesref-cite']; ?>" alt="<?php echo $img['alt']; ?>" /></span>
												<?php } ?>
												<span class='cite'>
													<strong><?php the_field('refQuoteNom'); ?></strong>
													<?php the_field('refQuotePoste'); ?>
												</span>
											</span>
										</span>
									</a>
								</li><!--

								--><?php endwhile; ?>
							</ul>

						</div>
					<?php
						endif;
						wp_reset_query();
					?>
					
					<a  href='<?php the_field('lien_vers_la_page_clients', 'options');?>' title='<?php _e('Nos clients', 'wisembly'); ?>' class='btnLight'><?php the_field('accueilRefBtn'); ?></a>
					<button class='icon-down scrollNext'><span></span></button>
				</section>

				<section class='content bgBlanc scrollHere'>
					<h2><?php the_field('accueilVideoTitre'); ?></h2>
					<div id="bloc-video">
						<div class='embed-container'><iframe id="player-1" class="iframe-video" src='<?php the_field('accueilVideo'); ?>' frameborder='0' allowfullscreen></iframe></div>
						<div class="cover-video">
							<div class="bg-cover-video"></div>
							<div class="filtre-bg-cover-video"></div>
							<div class="wrapper-zone-txt-cover-video">
								<div class="zone-txt-cover-video">
									<p><?php the_field('accueilVideoTxt'); ?></p>
									<a href="#" id="btn-video" class="btnBlanc"><span class="small">►</span> <?php the_field('accueilVideoBtn'); ?></a>
								</div>
							</div>
						</div>
					</div>
					<ul class='avantages'>
						<li class='accompagnement'>
							<h3><?php the_field('accueilAvantagesTitre1'); ?></h3>
							<p><?php the_field('accueilAvantagesTxt1'); ?></p>
						</li><li class='securite'>
							<h3><?php the_field('accueilAvantagesTitre2'); ?></h3>
							<p><?php the_field('accueilAvantagesTxt2'); ?></p>
						</li><li class='fiable'>
							<h3><?php the_field('accueilAvantagesTitre3'); ?></h3>
							<p><?php the_field('accueilAvantagesTxt3'); ?></p>
						</li><li class='technique'>
							<h3><?php the_field('accueilAvantagesTitre4'); ?></h3>
							<p><?php the_field('accueilAvantagesTxt4'); ?></p>
						</li>
					</ul>
					<button class='icon-down scrollNext'><span></span></button>
				</section>

				<section class='content bgBlanc paddingBottom scrollHere'>
					<h2><?php the_field('accueilPresseTitre'); ?></h2>
					<ul class='logosPresse'>
						<?php
						$countLogos = 0;
							$loop = new WP_Query( array( 'post_type' => 'presse', 'posts_per_page' => -1 ) );

							if( $loop->have_posts() ) :
								while( $loop->have_posts() ) : $loop->the_post();
						?><!--

							--><li <?php if($countLogos > 4) echo "class='none'"; ?>>
								<?php the_post_thumbnail('presse-logo'); ?>
							</li><!--

						--><?php
								$countLogos ++;
								endwhile;
							endif;

							wp_reset_query();
						?>
					</ul>
					<?php the_field('accueilPresseTxt'); ?>
				</section>

			</div>
		
		<?php endwhile; ?>
	
	<?php else : ?>
				
		<h1>404</h1>

	<?php endif; ?>

<?php get_footer(); ?>