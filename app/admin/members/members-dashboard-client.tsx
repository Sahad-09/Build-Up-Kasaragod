'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Users, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { deleteMember } from '@/lib/actions/member-actions';
import { useRouter } from 'next/navigation';

interface Member {
  id: string;
  name: string;
  position: string;
  image: string;
  fallback: string;
  category: 'Patron' | 'Core Team' | 'Vice President';
  order: number;
}

interface MembersDashboardClientProps {
  members: Member[];
}

export default function MembersDashboardClient({ members }: MembersDashboardClientProps) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (memberId: string) => {
    if (!confirm('Are you sure you want to delete this member?')) {
      return;
    }

    setDeletingId(memberId);
    const result = await deleteMember(memberId);
    setDeletingId(null);

    if (result.success) {
      router.refresh();
    } else {
      alert(result.error || 'Failed to delete member');
    }
  };

  // Group members by category
  const groupedMembers = {
    Patron: members.filter(m => m.category === 'Patron').sort((a, b) => a.order - b.order),
    'Core Team': members.filter(m => m.category === 'Core Team').sort((a, b) => a.order - b.order),
    'Vice President': members.filter(m => m.category === 'Vice President').sort((a, b) => a.order - b.order),
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <Link href="/admin" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold mb-2">Manage Members</h1>
          <p className="text-muted-foreground">Manage About Us page members</p>
        </div>
        <Link href="/admin/members/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add New Member
          </Button>
        </Link>
      </div>

      {members.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Users className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground mb-4">No members found.</p>
            <Link href="/admin/members/new">
              <Button>Create Your First Member</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-8">
          {Object.entries(groupedMembers).map(([category, categoryMembers]) => {
            if (categoryMembers.length === 0) return null;

            return (
              <Card key={category}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    {category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categoryMembers.map((member) => (
                      <motion.div
                        key={member.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Card className="hover:shadow-lg transition-shadow">
                          <CardContent className="p-6">
                            <div className="flex flex-col items-center space-y-4 mb-4">
                              <Avatar className="w-20 h-20">
                                <AvatarImage src={member.image} alt={member.name} />
                                <AvatarFallback>{member.fallback}</AvatarFallback>
                              </Avatar>
                              <div className="text-center">
                                <p className="font-semibold text-lg">{member.name}</p>
                                <Badge variant="secondary" className="mt-2">
                                  {member.position}
                                </Badge>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Link href={`/admin/members/${member.id}/edit`} className="flex-1">
                                <Button variant="outline" className="w-full">
                                  <Edit className="mr-2 h-4 w-4" />
                                  Edit
                                </Button>
                              </Link>
                              <Button
                                variant="destructive"
                                onClick={() => handleDelete(member.id)}
                                disabled={deletingId === member.id}
                                className="flex-1"
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                {deletingId === member.id ? 'Deleting...' : 'Delete'}
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
