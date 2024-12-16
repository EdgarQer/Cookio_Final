import React, { useState, useEffect } from "react";
import axios from "axios";
import "./UserProfile.css";
import { useNavigate } from "react-router-dom";

const token = localStorage.getItem("jwtToken");

const UserProfile = () => {
  const [user, setUser] = useState<{
    id: number;
    profilePic: string | null;
    firstName: string;
    lastName: string;
    bio: string;
    email: string;
    recipes: { id: number; title: string }[];
  } | null>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [newProfilePic, setNewProfilePic] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      if (!token) {
        setError("Authentication token is missing. Please log in again.");
        navigate("/login");
        return;
      }

      try {
        // Декодируем токен и выводим в консоль для проверки
        const decodedToken = JSON.parse(atob(token.split(".")[1]));
        console.log("Decoded token:", decodedToken);  // Выводим токен в консоль для проверки

        const email = decodedToken.email;
        console.log("Fetching user data for email:", email);

        const response = await axios.get(
          `http://localhost:8080/api/client/users/email/${email}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUser({
          id: response.data.id,
          profilePic: response.data.avatar || null,
          firstName: response.data.firstName || "",
          lastName: response.data.lastName || "",
          bio: response.data.bio || "",
          email: response.data.email,
          recipes: response.data.recipes || [],
        });
      } catch (err) {
        setError("Failed to fetch user data. Please try again.");
        console.error(err);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (user) {
      setUser((prevUser) =>
        prevUser ? { ...prevUser, [name]: value } : null
      );
    }
  };

  const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewProfilePic(e.target.files[0]);
    }
  };

  const handleSave = async () => {
    if (!user) return;

    if (!user.firstName.trim() || !user.lastName.trim()) {
      setError("First Name and Last Name cannot be empty.");
      return;
    }

    if (!token) {
      setError("Authentication token is missing. Please log in again.");
      navigate("/login");
      return;
    }

    // Декодируем токен и выводим содержимое в консоль
    const decodedToken = JSON.parse(atob(token.split(".")[1]));
    console.log("Decoded token:", decodedToken);  // Проверьте, что там есть userId и роли

    try {
      const updatedUser = {
        firstName: user.firstName.trim(),
        lastName: user.lastName.trim(),
        bio: user.bio.trim(),
        avatar: user.profilePic,
      };

      if (newProfilePic) {
        const reader = new FileReader();
        reader.onload = async () => {
          updatedUser.avatar = reader.result as string;

          await axios.put(
            `http://localhost:8080/api/client/users/${user.id}`,
            updatedUser,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          setUser((prevUser) =>
            prevUser ? { ...prevUser, ...updatedUser, profilePic: updatedUser.avatar } : null
          );
          setNewProfilePic(null);
          setIsEditing(false);
          setError(null);
        };
        reader.readAsDataURL(newProfilePic);
      } else {
        await axios.put(
          `http://localhost:8080/api/client/users/${user.id}`,
          updatedUser,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setUser((prevUser) =>
          prevUser ? { ...prevUser, ...updatedUser } : null
        );
        setIsEditing(false);
        setError(null);
      }
    } catch (err) {
      setError("Failed to save user data. Please try again.");
      console.error(err);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setNewProfilePic(null);
  };

  const handleAddRecipeClick = () => {
    navigate("/addrecipe");
  };

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="user-profile">
      <div className="profile-header">
        <img
          src={user.profilePic || "https://via.placeholder.com/150"}
          alt="Profile"
          className="profile-pic"
        />
        <div className="profile-info">
          {isEditing ? (
            <>
              <input
                type="text"
                name="firstName"
                value={user.firstName}
                onChange={handleInputChange}
                placeholder="First Name"
              />
              <input
                type="text"
                name="lastName"
                value={user.lastName}
                onChange={handleInputChange}
                placeholder="Last Name"
              />
              <textarea
                name="bio"
                value={user.bio}
                onChange={handleInputChange}
                placeholder="Short Bio"
              />
            </>
          ) : (
            <>
              <h2>{`${user.firstName} ${user.lastName}`}</h2>
              <p>{user.bio}</p>
            </>
          )}
          {isEditing && (
            <input
              type="file"
              accept="image/*"
              onChange={handleProfilePicChange}
              className="profile-pic-input"
            />
          )}
        </div>
        <button onClick={handleAddRecipeClick} className="add-recipe-button">
          Add New Recipe
        </button>
        <div className="profile-actions">
          {isEditing ? (
            <>
              <button onClick={handleSave}>Save</button>
              <button onClick={handleCancel}>Cancel</button>
            </>
          ) : (
            <button onClick={() => setIsEditing(true)}>Edit Profile</button>
          )}
        </div>
      </div>
      <div className="liked-posts">
        <h3>Saved Recipes</h3>
        {user.recipes.length > 0 ? (
          <ul>
            {user.recipes.map((recipe) => (
              <li key={recipe.id}>{recipe.title}</li>
            ))}
          </ul>
        ) : (
          <p>No saved recipes yet.</p>
        )}
      </div>
      {error && <p className="error-message">{error}</p>}
      
    </div>
  );
};

export default UserProfile;
