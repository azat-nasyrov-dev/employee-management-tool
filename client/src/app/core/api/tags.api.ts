import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tag } from '../models/tag.model';
import { API_BASE_URL } from './api.config';
import { CreateTagPayload } from '../models/create-tag.payload';
import { UpdateTagPayload } from '../models/update-tag.payload';
import { TagType } from '../models/tag.type';

@Injectable({ providedIn: 'root' })
export class TagsApi {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${API_BASE_URL}/tags`;

  /**
   * POST /tags
   */
  public createTag(payload: CreateTagPayload): Observable<Tag> {
    return this.http.post<Tag>(this.baseUrl, payload);
  }

  /**
   * GET /tags?type=
   */
  public findAllTags(type?: TagType): Observable<Tag[]> {
    return this.http.get<Tag[]>(this.baseUrl, {
      params: type ? { type: `${type}` } : {},
    });
  }

  /**
   * GET /tags/:id
   */
  public findTagById(id: string): Observable<Tag> {
    return this.http.get<Tag>(`${this.baseUrl}/${id}`);
  }

  /**
   * PATCH /tags/:id
   */
  public updateTagById(id: string, payload: UpdateTagPayload): Observable<Tag> {
    return this.http.patch<Tag>(`${this.baseUrl}/${id}`, payload);
  }

  /**
   * DELETE /tags/:id
   */
  public deleteTagById(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
