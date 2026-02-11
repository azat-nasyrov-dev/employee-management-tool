import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../../configs/api.config';
import { Tag } from './tags.models';
import { CreateTagPayload, UpdateTagPayload } from './tags.payloads';
import { TagType } from './tag-type.enum';

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
      params: type ? { type } : {},
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
  public removeTagById(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
