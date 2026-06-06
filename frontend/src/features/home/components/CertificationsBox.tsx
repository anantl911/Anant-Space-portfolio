import certifications from '@/data/certifications';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCertificate, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';

const CertificationsBox: React.FC = () => {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 mt-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certifications.map((cert, index) => (
          <motion.a
            href={cert.link || '#'}
            target="_blank"
            rel="noopener noreferrer"
            key={cert.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="bg-[#1a2224] border border-gray-700 p-6 rounded-xl hover:border-[#facd8a] transition-all duration-300 group flex items-start gap-4 hover:-translate-y-1 cursor-pointer"
          >
            <div className="text-gray-500 group-hover:text-[#facd8a] transition-colors mt-1">
              <FontAwesomeIcon icon={faCertificate} size="xl" />
            </div>

            <div className="flex-grow">
              <h3 className="text-white font-bold text-lg mb-1 leading-tight group-hover:text-[#facd8a] transition-colors">
                {cert.title}
              </h3>
              <div className="text-sm text-gray-400 flex justify-between items-center mt-2 border-t border-gray-700 pt-2">
                <span>{cert.issuer}</span>
                <span className="text-[#facd8a] font-mono text-xs bg-[#facd8a]/10 px-2 py-0.5 rounded">
                  {cert.date}
                </span>
              </div>
            </div>

            <div className="text-gray-600 group-hover:text-white transition-colors opacity-0 group-hover:opacity-100">
              <FontAwesomeIcon icon={faExternalLinkAlt} size="sm" />
            </div>
          </motion.a>
        ))}
      </div>
    </div>
  );
};

export default CertificationsBox;
