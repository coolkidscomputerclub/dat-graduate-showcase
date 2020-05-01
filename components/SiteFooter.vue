<template>
  <footer class="site-footer">
    <p class="footer-inner container clearfix">
      <span class="copyright">Copyright &#169; {{ year }}</span>

      <a
        href="http://digitalartandtechnology.co.uk"
        class="course-details"
        title="Find out more about digital art and technology"
        >BA / BSc (Hons) Digital Art &amp; Technology</a
      >
    </p>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      year: new Date().getFullYear(),
    };
  },
};
</script>

<style scoped>
.site-footer {
  text-align: center;
  border-top: 1px solid var(--color-grey-light);
}

.footer-inner {
  margin: 0 auto;
  padding: 30px;

  @media (--beta) {
    display: flex;
    align-items: center;
  }
}

.copyright {
  display: block;
  margin: 0 0 15px 0;

  @media (--beta) {
    margin: 0;
  }
}

.course-details {
  display: inline-block;
  padding: 4px;

  @media (--beta) {
    margin-left: auto;
  }
}
</style>
