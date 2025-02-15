"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function CommunityForum() {
  const [posts, setPosts] = useState([
    { id: 1, author: "User1", content: "Has anyone noticed improved air quality lately?" },
    { id: 2, author: "User2", content: "I'm organizing a community clean-up this weekend. Who's in?" },
  ])
  const [newPost, setNewPost] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newPost.trim()) {
      setPosts([...posts, { id: posts.length + 1, author: "CurrentUser", content: newPost }])
      setNewPost("")
    }
  }

  return (
    <div className="space-y-4 p-4">
      <h1 className="text-2xl font-bold">Community Forum</h1>
      {posts.map((post) => (
        <Card key={post.id} className="p-4">
          <h3 className="font-semibold">{post.author}</h3>
          <p>{post.content}</p>
        </Card>
      ))}
      <form onSubmit={handleSubmit} className="space-y-2">
        <Input value={newPost} onChange={(e) => setNewPost(e.target.value)} placeholder="Share your thoughts..." />
        <Button type="submit">Post</Button>
      </form>
    </div>
  )
}

