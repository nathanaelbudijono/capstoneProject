import Typography from "@/components/core/typography";

const Footer = () => {
  return (
    <footer className="px-16 max-md:px-6 h-[20vh] text-center py-5 mt-5 bg-primary">
      <section className="max-w-5xl mx-auto flex justify-center flex-col items-center gap-1">
        <div className="flex gap-2">
          <Typography variant="med">test</Typography>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
