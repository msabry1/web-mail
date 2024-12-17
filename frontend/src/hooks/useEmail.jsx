import { useState, useCallback, useMemo } from "react";
import { useEmailsContext } from "../context/EmailsContext";
import { useUI } from "../context/UIContext";

export const useEmail = (draftToEdit = null) => {
  const { saveDraft } = useEmailsContext();
  const { setComposing } = useUI();

  const initialData = useMemo(
    () => ({
      id: null,
      to: "",
      subject: "",
      message: "",
      priority: "Minor"
    }),
    []
  );

  const [formData, setFormData] = useState(
    draftToEdit ? { ...draftToEdit } : initialData
  );
  const [loading, setLoading] = useState(false);
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);

  const handleInputChange = useCallback(
    async (e) => {
      const { name, value } = e.target;

      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    },
    [formData]
  );

  const resetForm = useCallback(() => {
    setFormData(initialData);
    setLoading(false);
  }, [initialData]);

  const handleSaveDraft = (email) => {
    console.log("Saving draft:", email);
    saveDraft({
      ...email,
    });
    setComposing(false);
  };

  const handleSuccessClose = useCallback(() => {
    setShowSuccessAnimation(false);
    setTimeout(() => {
      setComposing(false);
    }, 1000);
  }, [setComposing]);

  return {
    formData,
    loading,
    showSuccessAnimation,
    handleInputChange,
    resetForm,
    handleSaveDraft,
    handleSuccessClose,
    setLoading,
    setShowSuccessAnimation,
  };
};
