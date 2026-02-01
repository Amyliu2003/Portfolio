import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import TextareaAutosize from 'react-textarea-autosize';
import { ProjectItem, ProcessSection } from "../data/projects";

interface ProjectDetailModalProps {
  project: ProjectItem | null;
  isOpen: boolean;
  onClose: () => void;
  isAdmin: boolean;
  onUpdate: (updatedProject: ProjectItem) => void;
}

const COLORS = {
  primary: "#181A4B",
  accent: "#BA76FF",
  dim: "rgba(255, 255, 255, 0.2)",
};

const THEME = {
  font: "font-sans uppercase tracking-tighter",
};

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  isOpen,
  onClose,
  isAdmin,
  onUpdate,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<ProjectItem | null>(null);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  useEffect(() => {
    if (project) {
      setFormData({ ...project });
      // Default to first section open if exists
      if (project.processSections && project.processSections.length > 0) {
        setExpandedSection(project.processSections[0].id);
      }
    }
    setIsEditing(false);
  }, [project]);

  const handleSave = () => {
    if (formData) {
      onUpdate(formData);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    if (project) {
      setFormData({ ...project });
    }
    setIsEditing(false);
  };

  const toggleSection = (id: string) => {
    setExpandedSection(expandedSection === id ? null : id);
  };

  // Helper to convert file to base64
  const handleImageUpload = (file: File, callback: (base64: string) => void) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (reader.result && typeof reader.result === 'string') {
        callback(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  // Process Section Helpers
  const updateProcessSection = (index: number, field: keyof ProcessSection, value: string) => {
    if (!formData) return;
    const newSections = [...(formData.processSections || [])];
    newSections[index] = { ...newSections[index], [field]: value };
    setFormData({ ...formData, processSections: newSections });
  };

  const addProcessSection = () => {
    if (!formData) return;
    const newId = `section-${Date.now()}`;
    const newSection: ProcessSection = {
      id: newId,
      title: "New Process Section",
      content: "",
      image: "",
    };
    setFormData({
      ...formData,
      processSections: [...(formData.processSections || []), newSection],
    });
    setExpandedSection(newId);
  };

  const removeProcessSection = (index: number) => {
    if (!formData) return;
    const newSections = [...(formData.processSections || [])];
    newSections.splice(index, 1);
    setFormData({ ...formData, processSections: newSections });
  };

  if (!isOpen || !project || !formData) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: "100%" }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: "100%" }}
        transition={{
          type: "spring",
          damping: 25,
          stiffness: 200,
        }}
        className="fixed inset-0 z-[200] flex flex-col overflow-y-auto bg-[#181A4B]"
      >
        <div className="fixed top-6 right-6 z-50 flex gap-4">
          {/* EDIT CONTROLS */}
          {isAdmin && (
            <>
              {isEditing ? (
                <>
                  <button
                    onClick={handleCancel}
                    className="p-4 border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-colors uppercase font-mono text-xs tracking-widest bg-[#181A4B]"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="p-4 border border-[#BA76FF] text-[#BA76FF] hover:bg-[#BA76FF] hover:text-black transition-colors uppercase font-mono text-xs tracking-widest bg-[#181A4B]"
                  >
                    Save Changes
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="p-4 border border-[#BA76FF] text-[#BA76FF] hover:bg-[#BA76FF] hover:text-black transition-colors uppercase font-mono text-xs tracking-widest bg-[#181A4B]"
                >
                  Edit Protocol
                </button>
              )}
            </>
          )}

          {/* CLOSE BUTTON */}
          <button
            onClick={onClose}
            className="p-4 border group bg-[#181A4B] hover:bg-[var(--accent)] transition-colors duration-300"
            style={{ borderColor: COLORS.dim }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="square"
              strokeLinejoin="miter"
              className="text-white group-hover:text-black"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className="w-full max-w-7xl mx-auto p-6 md:p-12 mt-12 mb-20">
          {/* HEADER SECTION */}
          <div
            className="flex flex-col md:flex-row md:items-end justify-between mb-8 border-b pb-8"
            style={{ borderColor: COLORS.dim }}
          >
            <div className="w-full">
              <h2 className="text-[var(--accent)] font-mono text-sm tracking-widest mb-2">
                {project.projectLabel}
              </h2>

              {isEditing ? (
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className={`w-full bg-white/10 border border-[#333] text-white px-4 py-2 text-4xl md:text-6xl font-black italic uppercase leading-none ${THEME.font} focus:border-[#BA76FF] outline-none mb-4`}
                />
              ) : (
                <h1
                  className={`text-6xl md:text-8xl font-black italic uppercase leading-none ${THEME.font}`}
                >
                  {project.title}
                </h1>
              )}
            </div>
            <div className="mt-4 md:mt-0 md:text-right flex-shrink-0 md:ml-8">
              <p className="font-mono text-xs uppercase tracking-widest opacity-60">
                Year: 2026
              </p>
              {isEditing ? (
                 <input
                  type="text"
                  value={formData.skills}
                  onChange={(e) =>
                    setFormData({ ...formData, skills: e.target.value })
                  }
                  className="w-full md:w-64 bg-white/10 border border-[#333] text-white px-2 py-1 font-mono text-xs uppercase tracking-widest focus:border-[#BA76FF] outline-none mt-1"
                  placeholder="Skills"
                />
              ) : (
                <p className="font-mono text-xs uppercase tracking-widest opacity-60">
                  {project.skills}
                </p>
              )}
            </div>
          </div>

          {/* IMAGE SECTION */}
          <div
            className="w-full aspect-video mb-12 relative overflow-hidden group border bg-white/5"
            style={{ borderColor: COLORS.dim }}
          >
             {isEditing && (
                <div className="absolute top-4 left-4 z-20 w-full max-w-md bg-black/80 p-4 border border-[#333] backdrop-blur-md">
                   <label className="block text-[10px] font-mono uppercase text-[#BA76FF] mb-2">Project Image</label>
                   
                   {/* File Upload Button */}
                   <label className="flex items-center justify-center w-full p-4 border-2 border-dashed border-[#333] hover:border-[var(--accent)] cursor-pointer transition-colors mb-4 group/upload">
                      <div className="text-center">
                        <span className="block text-xs font-mono uppercase text-white/50 group-hover/upload:text-white">Click to Upload Image</span>
                      </div>
                      <input 
                        type="file" 
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if(file) {
                             handleImageUpload(file, (base64) => setFormData({...formData, image: base64}));
                          }
                        }}
                      />
                   </label>

                   <div className="flex items-center gap-2">
                     <span className="text-[10px] font-mono uppercase text-white/30">OR URL:</span>
                     <input
                      type="text"
                      value={formData.image || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, image: e.target.value })
                      }
                      className="flex-grow bg-white/10 border border-[#333] text-white px-2 py-1 text-xs font-mono focus:border-[#BA76FF] outline-none"
                      placeholder="https://..."
                    />
                   </div>
                </div>
             )}

            {formData.image ? (
              <img
                src={formData.image}
                alt={formData.title}
                className="w-full h-full object-cover"
              />
            ) : (
               <div className="w-full h-full flex items-center justify-center text-white/20 font-mono uppercase">
                  No Image Preview
               </div>
            )}
          </div>

          {/* CONTENT GRID */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-8">
              <h3 className="text-2xl font-bold uppercase mb-4 text-[var(--accent)]">
                About Project
              </h3>
              
              {isEditing ? (
                <>
                  <TextareaAutosize
                    minRows={8}
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="w-full bg-white/10 border border-[#333] text-white px-4 py-4 text-lg font-light focus:border-[#BA76FF] outline-none leading-relaxed mb-8 resize-none selection:bg-[var(--accent)] selection:text-black"
                    placeholder="Description..."
                  />
                  
                  <div className="mb-8">
                     <label className="block text-xs font-mono uppercase text-[#BA76FF] mb-2">Custom HTML / Embed Code</label>
                     <TextareaAutosize
                        minRows={6}
                        value={formData.customHtml || ""}
                        onChange={(e) =>
                          setFormData({ ...formData, customHtml: e.target.value })
                        }
                        className="w-full bg-white/10 border border-[#333] text-white px-4 py-4 font-mono text-sm focus:border-[#BA76FF] outline-none resize-none selection:bg-[var(--accent)] selection:text-black"
                        placeholder="<div>Custom content...</div>"
                      />
                  </div>
                </>
              ) : (
                <>
                  <p className="text-xl md:text-2xl leading-relaxed opacity-80 font-light whitespace-pre-line mb-8 selection:bg-[var(--accent)] selection:text-black">
                    {project.description}
                  </p>
                  
                  {project.customHtml && (
                    <div 
                      className="mb-12 border border-[#333] p-4 bg-white/5"
                      dangerouslySetInnerHTML={{ __html: project.customHtml }}
                    />
                  )}
                </>
              )}

              {/* LINKS SECTION */}
              <div className="mt-8 mb-16">
                 {isEditing ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       <div className="flex flex-col gap-2">
                         <label className="text-xs font-mono uppercase text-[#BA76FF]">Live Demo Link</label>
                         <input
                          type="text"
                          value={formData.link || ""}
                          onChange={(e) =>
                            setFormData({ ...formData, link: e.target.value })
                          }
                          className="w-full bg-white/10 border border-[#333] text-white px-4 py-3 font-mono focus:border-[#BA76FF] outline-none"
                          placeholder="https://..."
                        />
                       </div>
                       <div className="flex flex-col gap-2">
                         <label className="text-xs font-mono uppercase text-[#BA76FF]">GitHub Repo Link</label>
                         <input
                          type="text"
                          value={formData.githubLink || ""}
                          onChange={(e) =>
                            setFormData({ ...formData, githubLink: e.target.value })
                          }
                          className="w-full bg-white/10 border border-[#333] text-white px-4 py-3 font-mono focus:border-[#BA76FF] outline-none"
                          placeholder="https://github.com/..."
                        />
                       </div>
                    </div>
                 ) : (
                    <div className="flex flex-wrap gap-4">
                        {formData.link && (
                          <a
                            href={formData.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block px-8 py-4 bg-[var(--accent)] text-black font-bold uppercase tracking-widest hover:bg-white transition-colors duration-300"
                          >
                            Launch Live Demo
                          </a>
                        )}
                        
                        {formData.githubLink && (
                          <a
                            href={formData.githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block px-8 py-4 bg-transparent border border-white text-white font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors duration-300"
                          >
                            View Code / Repo
                          </a>
                        )}
                    </div>
                 )}
              </div>
            </div>

            <div className="md:col-span-4 space-y-8">
              <div
                className="border-l pl-6"
                style={{ borderColor: COLORS.dim }}
              >
                <h4 className="font-mono text-xs uppercase tracking-widest text-[var(--accent)] mb-2">
                  Role
                </h4>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.role}
                    onChange={(e) =>
                      setFormData({ ...formData, role: e.target.value })
                    }
                    className="w-full bg-white/10 border border-[#333] text-white px-3 py-2 text-lg uppercase font-bold focus:border-[#BA76FF] outline-none"
                    placeholder="Role 1 • Role 2"
                  />
                ) : (
                  formData.role.split("•").map((r, i) => (
                    <p key={i} className="text-lg uppercase font-bold">{r.trim()}</p>
                  ))
                )}
              </div>
              <div
                className="border-l pl-6"
                style={{ borderColor: COLORS.dim }}
              >
                <h4 className="font-mono text-xs uppercase tracking-widest text-[var(--accent)] mb-2">
                  Tech Stack
                </h4>
                <ul className="space-y-1 font-mono text-sm opacity-70">
                  {formData.skills.split("•").map((skill, i) => (
                    <li key={i}>{skill.trim()}</li>
                  ))}
                </ul>
                
                {isEditing && (
                  <p className="mt-2 text-[10px] text-white/30 font-mono uppercase">
                    (Edit via top-right "Skills" field)
                  </p>
                )}
              </div>
            </div>
          </div>
          
          {/* PROCESS / BLOG SECTIONS - MOVED BELOW THE GRID FOR FULL WIDTH */}
          {(isEditing || (formData.processSections && formData.processSections.length > 0)) && (
            <div className="mt-16 border-t pt-12" style={{ borderColor: COLORS.dim }}>
              <div className="flex items-center justify-between mb-8">
                 <h3 className="text-2xl font-bold uppercase text-[var(--accent)]">
                    Process & Development
                 </h3>
                 {isEditing && (
                    <button 
                       onClick={addProcessSection}
                       className="px-4 py-2 border border-white/20 text-xs font-mono uppercase hover:bg-white hover:text-black transition-colors"
                    >
                       + Add Section
                    </button>
                 )}
              </div>

              <div className="space-y-4">
                {formData.processSections?.map((section, index) => (
                  <div key={section.id || index} className="border border-[#333] bg-transparent">
                    {isEditing ? (
                       <div className="p-4 space-y-4">
                          <div className="flex justify-between items-start">
                             <input
                               type="text"
                               value={section.title}
                               onChange={(e) => updateProcessSection(index, "title", e.target.value)}
                               className="w-full bg-white/10 border border-[#333] text-white px-3 py-2 font-bold uppercase focus:border-[#BA76FF] outline-none mr-4"
                               placeholder="Section Title"
                             />
                             <button
                                onClick={() => removeProcessSection(index)}
                                className="text-red-500 hover:text-red-400 p-2 text-xs uppercase font-mono"
                             >
                                Remove
                             </button>
                          </div>
                          <TextareaAutosize
                               minRows={4}
                               value={section.content}
                               onChange={(e) => updateProcessSection(index, "content", e.target.value)}
                               className="w-full bg-white/10 border border-[#333] text-white px-3 py-2 text-sm focus:border-[#BA76FF] outline-none resize-none selection:bg-[var(--accent)] selection:text-black"
                               placeholder="Section content..."
                             />
                           
                           {/* SECTION IMAGE UPLOAD */}
                           <div className="flex items-center gap-4">
                              <label className="px-3 py-2 bg-white/10 border border-[#333] hover:border-[var(--accent)] cursor-pointer transition-colors">
                                 <span className="text-[10px] font-mono uppercase text-white">Upload Image</span>
                                 <input 
                                    type="file" 
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => {
                                       const file = e.target.files?.[0];
                                       if(file) {
                                          handleImageUpload(file, (base64) => updateProcessSection(index, "image", base64));
                                       }
                                    }}
                                 />
                              </label>
                              <span className="text-[10px] font-mono text-white/30 uppercase">OR URL:</span>
                              <input
                                 type="text"
                                 value={section.image || ""}
                                 onChange={(e) => updateProcessSection(index, "image", e.target.value)}
                                 className="flex-grow bg-white/10 border border-[#333] text-white px-3 py-2 text-xs font-mono focus:border-[#BA76FF] outline-none"
                                 placeholder="Image URL (optional)"
                               />
                           </div>
                           {section.image && (
                              <div className="w-24 h-16 bg-white/5 relative border border-[#333] overflow-hidden">
                                 <img src={section.image} alt="Preview" className="w-full h-full object-cover" />
                              </div>
                           )}
                       </div>
                    ) : (
                       // VIEW MODE ACCORDION
                       <div>
                          <button
                             onClick={() => toggleSection(section.id)}
                             className="w-full flex items-center justify-between p-6 hover:bg-white/5 transition-colors text-left"
                          >
                             <h4 className="text-lg md:text-xl font-bold uppercase tracking-tight">
                                {section.title}
                             </h4>
                             <motion.span
                                animate={{ rotate: expandedSection === section.id ? 180 : 0 }}
                                transition={{ duration: 0.3 }}
                             >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                   <path d="M6 9l6 6 6-6" />
                                </svg>
                             </motion.span>
                          </button>
                          
                          <AnimatePresence>
                             {expandedSection === section.id && (
                                <motion.div
                                   initial={{ height: 0, opacity: 0 }}
                                   animate={{ height: "auto", opacity: 1 }}
                                   exit={{ height: 0, opacity: 0 }}
                                   transition={{ duration: 0.3 }}
                                   className="overflow-hidden"
                                >
                                   <div className="p-6 pt-0 border-t border-[#333]">
                                      {section.image && (
                                         <div className="my-6 w-full aspect-[21/9] overflow-hidden">
                                            <img 
                                               src={section.image} 
                                               alt={section.title} 
                                               className="w-full h-full object-cover transition-all duration-700"
                                            />
                                         </div>
                                      )}
                                      <p className="text-lg leading-relaxed text-gray-300 font-light whitespace-pre-line selection:bg-[var(--accent)] selection:text-black">
                                         {section.content}
                                      </p>
                                   </div>
                                </motion.div>
                             )}
                          </AnimatePresence>
                       </div>
                    )}
                  </div>
                ))}
                
                {(!formData.processSections || formData.processSections.length === 0) && !isEditing && (
                   <p className="text-white/30 italic">No process documentation available for this project.</p>
                )}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
