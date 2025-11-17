import React, { useRef, useState } from "react";
import "../css/UploadReel.css";
import ActiveCompetition from "../components/Competition/ActiveCompetition";
import { useLocation } from "react-router-dom";
import UploadPostToDatabase from "../components/UploadToDatabase/UploadPostToDatabase";
import fire from "../config/fire";

import {
	getDatabase,
	set,
	onValue,
	ref as dbRef,
	push,
} from "firebase/database";
import {
	ref as storageRef,
	getStorage,
	uploadBytesResumable,
	uploadString,
	uploadBytes,
	getDownloadURL,
} from "firebase/storage";
import { toast, ToastContainer } from "react-toastify";

const UploadReel = () => {
	const [files, setFiles] = useState([]);
	const [title, setTitle] = useState("");
	const [caption, setCaption] = useState("");
	const location = useLocation();
	const storage = getStorage();
	const database = getDatabase();
	const handleUpload = async () => {
		if (!title || !caption || files.length === 0) {
			toast.warn("Title, caption and images/videos are required");
			return;
		}

		try {
			const uploadedFileURLs = [];

			for (let i = 0; i < files.length; i++) {
				const f = files[i];
				const fileRef = storageRef(
					storage,
					`reels/${Date.now()}_${f.name}`
				);
				await uploadBytes(fileRef, f);
				const downloadURL = await getDownloadURL(fileRef);
				uploadedFileURLs.push({
					name: f.name,
					type: f.type.startsWith("image/") ? "image" : "video",
					url: downloadURL,
				});
			}

			const newReelRef = push(dbRef(database, "reels"));
			const db = getDatabase();
			const user = Date.now();

			await set(dbRef(db, `userPostDetails/ ${user}`), {
				title,
				caption,
				imageArray: uploadedFileURLs,
				createdAt: Date.now(),
			});

			toast.success("Reel posted successful...!");
			setFiles([]);
			setTitle("");
			setCaption("");
		} catch (error) {
			console.error("Upload failed", error);
			alert("Failed to upload. Try again.");
		}
	};

	return (
		<div className="upload-reel-container">
			<ToastContainer />
			<div className="upload-reel-title">
				<h2 className="font-weight-bold pt-4">Upload Your Reel</h2>
			</div>
			<div className="py-2">
				<ActiveCompetition />
			</div>
			<div className="d-flex flex-wrap text-center px-4 py-3">
				<div className="upload-reel my-3">
					<div className="upload-video-section-heading pb-3 px-lg-4 text-left">
						<span>
							<i
								class="fa fa-video-camera pr-2"
								aria-hidden="true"
							></i>
							Upload Video
						</span>
					</div>
					<div className="upload-video-file">
						<div className="upload-file-icon">
							<i class="fa fa-upload" aria-hidden="true" />
						</div>
						<div className="py-3 drag-drop-video">
							<span className="font-weight-bold">
								Drag and drop your video here
							</span>
							<span className="text-secondary">
								or click to browse
							</span>
						</div>
						<div>
							<UploadPostToDatabase
								files={files}
								setFiles={setFiles}
							/>
						</div>
					</div>
					<div className="text-left pt-4 upload-video-file-note text-secondary">
						<ul className="px-lg-5 px-3">
							<li>Supported formats: MP4, MOV, AVI</li>
							<li>Maximum file size: 50MB</li>
							<li>Recommended duration: 15-60 seconds</li>
						</ul>
					</div>
				</div>
				<div className="upload-reel reel-details text-left my-3">
					<div>
						<span className="p-3 reel-details-title">
							Reel Details
						</span>
					</div>
					<div className="d-flex flex-column reel-details-input px-3">
						<label>Title</label>
						<input
							placeholder="Give your reel a catchy title.."
							value={title}
							onChange={(e) => setTitle(e.target.value)}
						/>

						<label>Caption</label>
						<textarea
							placeholder="Write a caption for your reel.."
							value={caption}
							onChange={(e) => setCaption(e.target.value)}
						/>
					</div>
					<div className="px-3 pt-4 text-secondary reel-details-note">
						<p>
							<b>Note: </b> once you upload the post you can't
							edit or change it anymore. so whenever you upload
							the picture upload it carefully.
						</p>
					</div>
					<div className="d-flex justify-content-center pt-lg-4 pt-3 ">
						<button
							className="submit-reel-btn"
							onClick={handleUpload}
						>
							<i class="fa fa-upload pr-3" aria-hidden="true"></i>
							Upload & Join Competition
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default UploadReel;
