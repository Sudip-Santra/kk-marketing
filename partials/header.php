<?php
// Announcement bar + sticky header. The link for $page gets aria-current.
$nav = [
    'products' => ['Products', $base . 'products/'],
    'about'    => ['About', $base . 'about/'],
    'clients'  => ['Who we supply', $base . '#clients'],
    'process'  => ['How to order', $base . '#process'],
];
?>
<div class="bar">
  <div class="wrap">
    <span class="label"><span class="dot"></span>Disposable plates, bowls &amp; cups — Margao, Goa</span>
    <span class="label hide-sm">Supplying since 2015 · Bulk orders welcome</span>
  </div>
</div>

<header>
  <nav class="wrap grid">
    <a href="<?= $base ?: '#top' ?>" class="logo" aria-label="K K Marketing — home"><svg class="logo-svg" role="img" aria-label="K K Marketing" viewBox="0 0 270.22 64"><use href="#brand-logo"/></svg></a>
    <div class="links">
<?php foreach ($nav as $key => [$label, $href]): ?>
      <a href="<?= $href ?>"<?= $key === $page ? ' aria-current="page"' : '' ?>><?= $label ?></a>
<?php endforeach; ?>
    </div>
    <div class="nav-cta">
      <a href="tel:<?= PHONE_TEL ?>" class="btn line">Call</a>
      <a href="<?= $base ?>#contact" class="btn">Get a rate <svg class="i arr" aria-hidden="true"><use href="#i-arrow-right"/></svg></a>
    </div>
  </nav>
</header>
