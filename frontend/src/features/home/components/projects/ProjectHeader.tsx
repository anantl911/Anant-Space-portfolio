import { motion } from "framer-motion"

export const ProjectsHeader = () => (

        <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="flex justify-center mb-15"
      >
        <h2 className="text-[#facd8a] text-[clamp(24px,2.5vw,36px)]">
          Fea<span className="border-b-2 border-[#facd8a] pb-5">tured Proj</span><span>ects</span>
        </h2>
      </motion.div>
    )
    