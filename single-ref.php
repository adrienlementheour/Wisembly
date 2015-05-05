<?php get_header(); ?>

	<?php if ( have_posts() ) : ?>

		<?php while ( have_posts() ) : the_post(); ?>

			<section class='head headEtude <?php the_field('refTheme') ?>'>
				<div class='content main'>
					<div class='quoteHead'>
						<blockquote>
							<?php the_field('refQuote'); ?>
							<b><span><?php the_field('refQuoteNom'); ?>,</span> <?php the_field('refQuotePoste'); ?></b>
						</blockquote><div class='logo'>
							<div class='roundImg'>
								<?php the_post_thumbnail('presse-logo'); ?>
							</div>
						</div>
					</div>
				</div>
			</section>

			<article class='wrapper content scrollHere' role='main'>			

				<span class='dateEtude'><?php the_field('refDate'); ?></span>
				<h2 class='h1 noMarginTop'><?php the_title(); ?></h2>
				
				<?php the_field('refTxt'); ?>

				<ul class='detailEtude'>
					<?php if(get_field('refEnjeux')){ ?>
						<li class='enjeux'>
							<h3><?php _e('Les enjeux', 'wisembly'); ?></h3>
							<?php the_field('refEnjeux'); ?>
						</li>
					<?php } if(get_field('refSolutions')){ ?>
						<li class='solutions'>
							<h3><?php _e('Les solutions', 'wisembly'); ?></h3>
							<?php the_field('refSolutions'); ?>
						</li>
					<?php } if(get_field('refBenef')){ ?>
						<li class='benefices'>
							<h3><?php _e('Les bénéfices', 'wisembly'); ?></h3>
							<?php the_field('refBenef'); ?>
						</li>
					<?php } ?>
				</ul>
				
				<?php if(get_field('refChiffre1')){ ?>
					<h3><?php _e('En quelques chiffres', 'wisembly'); ?></h3>

					<ul class='listeChiffres'>
						<li class='containerChiffre'>
							<span class='chiffre'><?php the_field('refChiffre1'); ?></span>
							<span class='legend'><?php the_field('refChiffre1Txt'); ?></span>
						</li>
						<?php if(get_field('refChiffre2')){ ?>
							<li class='containerChiffre'>
								<span class='chiffre'><?php the_field('refChiffre2'); ?></span>
								<span class='legend'><?php the_field('refChiffre2Txt'); ?></span>
							</li>
						<?php } ?>
						<?php if(get_field('refChiffre3')){ ?>
							<li class='containerChiffre'>
								<span class='chiffre'><?php the_field('refChiffre3'); ?></span>
								<span class='legend'><?php the_field('refChiffre3Txt'); ?></span>
							</li>
						<?php } ?>
						<?php if(get_field('refChiffre4')){ ?>
							<li class='containerChiffre'>
								<span class='chiffre'><?php the_field('refChiffre4'); ?></span>
								<span class='legend'><?php the_field('refChiffre4Txt'); ?></span>
							</li>
						<?php } ?>
						<?php if(get_field('refChiffre5')){ ?>
							<li class='containerChiffre'>
								<span class='chiffre'><?php the_field('refChiffre5'); ?></span>
								<span class='legend'><?php the_field('refChiffre5Txt'); ?></span>
							</li>
						<?php } ?>
					</ul>
				<?php } ?>

				<?php if(get_the_content()){ ?> <button class="icon-down scrollNext"><span></span></button> <?php } ?>
						
			</article>

			<?php if(get_the_content()){ ?>

				<article class='wrapper content scrollHere'>
					<?php the_content(); ?>
				</article>

			<?php } ?>

			<article class='wrapper content scrollHere marginTop'>
				<a class='prevLink lienVert' href='<?php the_field('lien_vers_la_page_clients', 'options');?>' title='<?php _e('Nos clients', 'wisembly'); ?>'><?php _e('Retour à la liste des études de cas', 'wisembly'); ?></a>
			</article>

		<?php endwhile; ?>


	<?php else : ?>
				
		<article>
			<h1>404</h1>
		</article>

	<?php endif; ?>

<?php get_footer(); ?>
