import React, { useEffect, useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const UploadPostToDatabase = ({ files, setFiles }) => {
	const inputFile = useRef(null);
	const [previewURLs, setPreviewURLs] = useState([]);

	// Clean up URLs on unmount
	useEffect(() => {
		return () => {
			previewURLs.forEach((preview) => URL.revokeObjectURL(preview.url));
		};
	}, [previewURLs]);

	// Clear previews when files are empty
	useEffect(() => {
		if (!files || files.length === 0) {
			previewURLs.forEach((preview) => URL.revokeObjectURL(preview.url));
			setPreviewURLs([]);
		}
	}, [files]);

	const handleChange = (e) => {
		const selectedFiles = Array.from(e.target.files);

		const allowedTypes = [
			"video/mp4",
			"video/quicktime", // MOV
			"video/x-msvideo", // AVI
			"image/jpeg",
			"image/jpg",
			"image/png",
			"image/webp",
			"image/gif",
		];

		const maxFileSize = 50 * 1024 * 1024; // 50MB
		const totalFiles = [...files, ...selectedFiles];

		if (totalFiles.length > 4) {
			toast.warn("You can upload a maximum of 4 images or videos.");
			return;
		}

		const isDuplicate = (f) =>
			files.some(
				(existing) =>
					existing.name === f.name &&
					existing.size === f.size &&
					existing.type === f.type
			);

		const validFiles = selectedFiles.filter((f) => {
			if (!allowedTypes.includes(f.type)) {
				toast.warn(`${f.name} is not a supported file format.`);
				return false;
			}

			if (f.size > maxFileSize) {
				toast.warn(`${f.name} exceeds the 50MB size limit.`);
				return false;
			}

			if (isDuplicate(f)) {
				toast.warn(`${f.name} has already been selected.`);
				return false;
			}

			return true;
		});

		setFiles((prev) => [...prev, ...validFiles]);

		// Generate previews for new image files
		const imageFiles = validFiles.filter((f) =>
			f.type.startsWith("image/")
		);
		const imagePreviews = imageFiles.map((f) => ({
			name: f.name,
			url: URL.createObjectURL(f),
		}));
		setPreviewURLs((prev) => [...prev, ...imagePreviews]);
	};

	// Revoke object URLs on unmount
	useEffect(() => {
		return () => {
			previewURLs.forEach((preview) => URL.revokeObjectURL(preview.url));
		};
	}, [previewURLs]);

	return (
		<div>
			<ToastContainer />
			<button
				type="button"
				onClick={() => inputFile.current.click()}
				className="choose-video-btn"
			>
				Choose image / video file
			</button>
			<input
				type="file"
				accept=".mp4,.mov,.avi,.jpg,.jpeg,.png,.webp,.gif"
				multiple
				onChange={handleChange}
				ref={inputFile}
				style={{ display: "none" }}
			/>

			<div className="pt-3 d-flex justify-content-center">
				{previewURLs.length > 0 ? (
					<div
						style={{
							display: "flex",
							gap: "10px",
							marginTop: "10px",
						}}
					>
						{previewURLs.map((img, idx) => (
							<img
								key={idx}
								src={img.url}
								alt={img.name}
								style={{
									width: "45px",
									height: "45px",
									objectFit: "cover",
									borderRadius: "4px",
								}}
							/>
						))}
					</div>
				) : (
					<span className="text-secondary">
						slected images/videos
					</span>
				)}
			</div>
		</div>
	);
};

export default UploadPostToDatabase;
