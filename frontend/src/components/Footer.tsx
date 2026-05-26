export default function Footer() {
  return (
    <footer
      id="contact"
      className="py-16 px-4 sm:px-6 lg:px-8 text-white"
      style={{ background: "var(--kb-blue)" }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg gradient-gold text-[var(--kb-blue)]">
                KB
              </div>
              <span className="text-xl font-bold" style={{ fontFamily: "var(--font-display)" }}>
                KB Brothers
              </span>
            </div>
            <p className="text-sm text-white/60 leading-relaxed">
              Official Hindustan Unilever distribution partner. Powering retail growth across the region.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2">
              <a href="#home" className="block text-sm text-white/60 hover:text-white transition-colors">Home</a>
              <a href="#brands" className="block text-sm text-white/60 hover:text-white transition-colors">Our Brands</a>
              <a href="#why-us" className="block text-sm text-white/60 hover:text-white transition-colors">Why Us</a>
              <a href="#partner" className="block text-sm text-white/60 hover:text-white transition-colors">Partner with Us</a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <div className="space-y-2 text-sm text-white/60">
              <p>📧 contact@kbbrothers.in</p>
              <p>📞 +91 98XXX XXXXX</p>
              <p>📍 Distribution Center, Your City</p>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <div className="space-y-2">
              <a href="#" className="block text-sm text-white/60 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="block text-sm text-white/60 hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="block text-sm text-white/60 hover:text-white transition-colors">Complaints</a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-white/40">
            © 2026 KB Brothers. All rights reserved.
          </p>
          <p className="text-sm text-white/40">
            Authorized HUL Distributor
          </p>
        </div>
      </div>
    </footer>
  );
}
